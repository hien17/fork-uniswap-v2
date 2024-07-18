# Fork UniswapV2 

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

## Config chain:

```shell
neoxTestnetV4: {
            accounts: [privateKey!],
            chainId: 12227332,
            url: "https://neoxt4seed1.ngd.network",
            gasPrice: 100e9,
        }
```

## Use hardhat to test and deploy

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```
## Script
```shell
npx hardhat run --network neoxTestnetV4 scripts/forkUniswapV2.ts

Result(3) [
  100000000000000000000n,
  100000000000000000000n,
  1721328257n
]
```