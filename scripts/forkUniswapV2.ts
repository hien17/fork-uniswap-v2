/* eslint-disable @typescript-eslint/no-explicit-any */
import FactoryArtifact from "@uniswap/v2-core/build/UniswapV2Factory.json";
import RouterArtifact from "@uniswap/v2-periphery/build/UniswapV2Router02.json";
import PairArtifact from "@uniswap/v2-periphery/build/IUniswapV2Pair.json";
import Weth9 from "../abi/WETH9.json";
import { ethers } from "hardhat";
import { Web3Utils } from "../utils";

const web3Utils = new Web3Utils();

async function main() {
    const [owner] = await ethers.getSigners();
    const Factory = new ethers.ContractFactory(
        FactoryArtifact.abi,
        FactoryArtifact.bytecode,
        owner
    );

    const factory = await Factory.deploy(owner.address);
    await factory.waitForDeployment();
    web3Utils.db.write("UniswapV2Factory", await factory.getAddress());

    const Token = await ethers.getContractFactory("Token");
    const usdt = await Token.deploy("USDT", "USDT");
    await usdt.waitForDeployment();
    const usdc = await Token.deploy("USDC", "USDC");
    await usdc.waitForDeployment();

    try {
        const tx = await (factory as any).createPair(usdc.target, usdt.target);
        await tx.wait(1);
    } catch {
        const tx = await (factory as any).createPair(usdt.target, usdc.target);
        await tx.wait(1);
    }

    const pairAddr: string = await (factory as any).getPair(
        usdt.target,
        usdc.target
    );
    const pair = new ethers.Contract(pairAddr, PairArtifact.abi, owner);
    const Weth = new ethers.ContractFactory(Weth9.abi, Weth9.bytecode, owner);
    const weth = await Weth.deploy();
    await weth.waitForDeployment();

    const Router = new ethers.ContractFactory(
        RouterArtifact.abi,
        RouterArtifact.bytecode,
        owner
    );
    const router = await Router.deploy(factory.target, weth.target);
    await router.waitForDeployment();

    const usdtApproveTx = await (usdt as any).approve(
        router.target,
        ethers.parseEther("10000")
    );
    await usdtApproveTx.wait(1);
    const usdcApproveTx = await (usdc as any).approve(
        router.target,
        ethers.parseEther("10000")
    );
    await usdcApproveTx.wait(1);

    const tokenAmount = ethers.parseEther("100");
    const deadline = Math.floor(Date.now() / 1000 + 10 * 60);
    const addLiquidTx = await (router as any).addLiquidity(
        usdc.target,
        usdt.target,
        tokenAmount,
        tokenAmount,
        0,
        0,
        owner.address,
        deadline
    );
    await addLiquidTx.wait();

    console.log(await (pair as any).getReserves());
}

main().catch(console.error);
