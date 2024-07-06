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
        },
    },
};

export default config;
