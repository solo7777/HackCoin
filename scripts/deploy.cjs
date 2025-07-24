const hre = require("hardhat");

async function main() {
  const initialSupply = hre.ethers.parseUnits("4000000", 18);

  const HackCoin = await hre.ethers.getContractFactory("HackCoin");
  const hackCoin = await HackCoin.deploy(initialSupply);

  await hackCoin.waitForDeployment();

  console.log("HackCoin deployed to:", hackCoin.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
