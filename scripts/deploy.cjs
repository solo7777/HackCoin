const hre = require("hardhat");

async function main() {
  const initialSupply = hre.ethers.utils.parseUnits("4000000", 18); // 4 млн токенів з 18 decimals

  const HackCoin = await hre.ethers.getContractFactory("HackCoin");
  const hackCoin = await HackCoin.deploy(initialSupply);

  await hackCoin.deployed();

  console.log("HackCoin deployed to:", hackCoin.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
