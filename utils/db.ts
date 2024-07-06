import fs from "fs";
import { network } from "hardhat";

/**
 * #### Description
 * Class for store deployed contract in file by network name
 */
export class Database {
    /**
     * Paths database
     * @param network
     * @returns
     */
    _path(network: string) {
        return `./db/${network}.json`;
    }

    /**
     * Get saved smart contract address
     * @param network network name
     * @param smcName name of smart contract want to get address
     * @returns
     */
    read(network: string, smcName: string): string | null {
        const filePath = this._path(network);
        if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath, "utf-8"))[smcName];
        }
        return null;
    }

    /**
     * Save smart contract into file
     * @param nw network name
     * @param smcName name of smart contract wan to save
     * @param address address of deployed smart contract
     */
    write(smcName: string, address: string, nw: string = network.name) {
        let file: { [key: string]: string } = {};
        const filePath = this._path(nw);
        if (fs.existsSync(filePath)) {
            file = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        }
        file[smcName] = address;
        fs.writeFileSync(filePath, JSON.stringify(file));
    }
}
