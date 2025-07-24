require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify"); // додано для верифікації

const ALCHEMY_API_URL = process.env.ALCHEMY_API_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: ALCHEMY_API_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      sepolia: "F3I6FVZZXNJ289Q21E65B83T647QW33CUH", // твій ключ
    },
  },
};
