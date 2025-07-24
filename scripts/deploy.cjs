const { ethers } = require("hardhat");

async function main() {
  const HackCoin = await ethers.getContractFactory("HackCoin");
  const hackCoin = await HackCoin.deploy();
  await hackCoin.waitForDeployment();

  console.log("HackCoin deployed to:", hackCoin.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
