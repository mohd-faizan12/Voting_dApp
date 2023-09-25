require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {

  localhost: {
    url: "http://127.0.0.1:8545"
  },

  networks: {
    hardhat: {
    },
    Sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/4K779f_FLUWvxtBHojYKq-qOddFynFf9", // Replace with your Infura Project ID
      accounts: ["453d13a1d5f662bc76e586bd4f352580a7db8c7841bd8160478ed0635bffbccd"],
    },
  },
  solidity: {
    version: "0.8.18", // Use a version compatible with your smart contract
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  namedAccounts: {
    deployer: 0, // Index of the mnemonic account that will deploy contracts
  },
};
