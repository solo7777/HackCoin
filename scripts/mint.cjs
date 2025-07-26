// scripts/mint.js
const hre = require("hardhat");

async function main() {
  // 🔐 Підключення гаманця (той, що в .env)
  const [deployer] = await hre.ethers.getSigners();

  // 🧱 Адреса вже задеплоєного контракту HackCoin
  const contractAddress = "0x1Fa5036a3df254Ead1A5930BD208Ac760b1C2010"; // ← Замінити, якщо інший

  // 💼 Отримуємо підключення до контракту
  const HackCoin = await hre.ethers.getContractFactory("HackCoin");
  const hackCoin = await HackCoin.attach(contractAddress);

  // 📤 Куди хочемо надіслати нові токени:
  const recipient = deployer.address; // або будь-яка інша адреса
  const amount = hre.ethers.parseUnits("1000", 18); // 1000 токенів

  // 🔄 Викликаємо функцію mint()
  const tx = await hackCoin.mint(recipient, amount);
  await tx.wait();

  console.log(`✅ Minted 1000 HKC to ${recipient}`);
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});
