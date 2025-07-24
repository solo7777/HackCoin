const { ethers } = require("hardhat");

async function main() {
  // Number of tokens, taking into account 18 decimal places
  const initialSupply = ethers.utils.parseUnits("4000000", 18);

  const HackCoin = await ethers.getContractFactory("HackCoin");
  const hackCoin = await HackCoin.deploy(initialSupply);

  await hackCoin.deployed();

  console.log("HackCoin deployed to:", hackCoin.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
