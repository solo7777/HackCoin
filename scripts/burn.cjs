const hre = require("hardhat");

async function main() {
  // Отримуємо об'єкт Signer (гаманець, з якого викликаємо burn)
  const [deployer] = await hre.ethers.getSigners();

  // Адреса вже задеплоєного контракту HackCoin у Sepolia
  const contractAddress = "0x1Fa5036a3df254Ead1A5930BD208Ac760b1C2010";

  // Підключаємось до контракту
  const HackCoin = await hre.ethers.getContractFactory("HackCoin");
  const hackCoin = await HackCoin.attach(contractAddress);

  // Скільки хочеш спалити (в цілих HKC)
  const amountToBurn = "100";

  // Конвертуємо в wei
  const amount = hre.ethers.parseUnits(amountToBurn, 18);

  // Викликаємо burn
  const tx = await hackCoin.burn(amount);
  await tx.wait();

  console.log(`🔥 Спалено ${amountToBurn} HKC з адреси ${deployer.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Помилка:", error);
    process.exit(1);
  });
