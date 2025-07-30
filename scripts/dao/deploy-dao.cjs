const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("👤 Deployer:", deployer.address);

  // 1. Deploy HackCoin (з 3.95M supply)
  const HackCoin = await hre.ethers.getContractFactory("HackCoin");
  const hackCoin = await HackCoin.deploy();
  await hackCoin.waitForDeployment();
  console.log("✅ HackCoin deployed at:", hackCoin.target);

  // 2. Deploy TimeLock (затримка: 1 день = 86400 секунд)
  const minDelay = 86400;
  const proposers = []; // Задаємо пізніше
  const executors = []; // Всі можуть виконувати
  const TimeLock = await hre.ethers.getContractFactory("TimeLock");
  const timeLock = await TimeLock.deploy(minDelay, proposers, executors);
  await timeLock.waitForDeployment();
  console.log("✅ TimeLock deployed at:", timeLock.target);

  // 3. Deploy HackDAO (Governor)
  const HackDAO = await hre.ethers.getContractFactory("HackDAO");
  const hackDAO = await HackDAO.deploy(hackCoin.target, timeLock.target);
  await hackDAO.waitForDeployment();
  console.log("✅ HackDAO deployed at:", hackDAO.target);

  // 4. Налаштування ролей у TimeLock
  const PROPOSER_ROLE = await timeLock.PROPOSER_ROLE();
  const EXECUTOR_ROLE = await timeLock.EXECUTOR_ROLE();
  const ADMIN_ROLE = await timeLock.TIMELOCK_ADMIN_ROLE();

  await timeLock.grantRole(PROPOSER_ROLE, hackDAO.target);
  await timeLock.grantRole(EXECUTOR_ROLE, hre.ethers.ZeroAddress); // всі можуть виконувати
  await timeLock.revokeRole(ADMIN_ROLE, deployer.address); // прибираємо себе
  console.log("🔐 DAO контроль встановлено. Ти більше не root :)");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
