const hre = require("hardhat");

async function main() {
  const [sender] = await hre.ethers.getSigners(); // це перший акаунт з Hardhat

  const hackCoinAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
  const recipientAddress = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";

  const HackCoin = await hre.ethers.getContractFactory("HackCoin");
  const hackCoin = await HackCoin.attach(hackCoinAddress);

  const amount = hre.ethers.parseUnits("1000", 18); // 1000 HackCoin

  const tx = await hackCoin.transfer(recipientAddress, amount);
  await tx.wait();

  console.log(`✅ Transferred 1000 HackCoin to ${recipientAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
