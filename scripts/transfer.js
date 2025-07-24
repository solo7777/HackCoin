const hre = require("hardhat");

async function main() {
  // Отримуємо адреси акаунтів Hardhat (їх за замовчуванням 20)
  const [owner, recipient] = await hre.ethers.getSigners();

  // Підключаємось до вже задеплоєного контракту HackCoin
  // Вкажи тут адресу твого контракту після деплою
  const hackCoinAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const HackCoin = await hre.ethers.getContractFactory("HackCoin");
  const hackCoin = await HackCoin.attach(hackCoinAddress);

  // Показуємо баланси до переказу
  console.log("Before transfer:");
  console.log("Owner balance:", (await hackCoin.balanceOf(owner.address)).toString());
  console.log("Recipient balance:", (await hackCoin.balanceOf(recipient.address)).toString());

  // Переказуємо 1000 HackCoin від owner до recipient
  const tx = await hackCoin.transfer(recipient.address, hre.ethers.parseUnits("1000", 18));
  await tx.wait();

  // Показуємо баланси після переказу
  console.log("After transfer:");
  console.log("Owner balance:", (await hackCoin.balanceOf(owner.address)).toString());
  console.log("Recipient balance:", (await hackCoin.balanceOf(recipient.address)).toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
