require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("./tasks/account-balance");
require("./tasks/block-number");
require("hardhat-gas-reporter");
require("solidity-coverage");

const GOERLI_RCP_URL = process.env.GOERLI_RCP_URL || "https://www.random.com";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x1234";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "0x1234";
const COINMARKET_API_KEY = process.env.COINMARKET_API_KEY || "0x1234";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: GOERLI_RCP_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      //accounts: <Hardhat is smart enough its already there>,
      chainId: 31337,
    },
  },
  solidity: "0.8.17",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COINMARKET_API_KEY,
  },
};
