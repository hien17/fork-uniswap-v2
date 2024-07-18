import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const privateKey = process.env.PRIVATE_KEY;

const config: HardhatUserConfig = {
    solidity: "0.6.6",
    networks: {
        ganache: {
            accounts: [privateKey!],
            chainId: 1337,
            url: "http://localhost:8545",
        },
        neox: {
            accounts: [privateKey!],
            chainId: 12227331,
            url: "https://neoxseed1.ngd.network",
            gasPrice: 300000000000,
        },
        arbSepolia: {
            accounts: [privateKey!],
            chainId: 421614,
            url: "https://sepolia-rollup.arbitrum.io/rpc",
        },
        neoxTestnetV4: {
            accounts: [privateKey!],
            chainId: 12227332,
            url: "https://neoxt4seed1.ngd.network",
            gasPrice: 100e9,
        }
    },
};

export default config;
