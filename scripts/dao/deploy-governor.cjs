// scripts/dao/deploy-governor.cjs
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("👤 Deployer address:", deployer.address);

  // 1. Деплой токена для голосування (VoteToken)
  const VoteToken = await hre.ethers.getContractFactory("VoteToken");
  const voteToken = await VoteToken.deploy();
  await voteToken.waitForDeployment();
  console.log("✅ VoteToken deployed at:", voteToken.target);

  // 2. Деплой TimeLock з 1 day delay
  const minDelay = 3600 * 24; // 1 день у секундах
  const proposers = []; // адреси, які можуть створювати пропозиції (призначимо згодом)
  const executors = []; // адреси, які можуть виконувати пропозиції (всі)
  const TimeLock = await hre.ethers.getContractFactory("TimeLock");
  const timeLock = await TimeLock.deploy(minDelay, proposers, executors);
  await timeLock.waitForDeployment();
  console.log("✅ TimeLock deployed at:", timeLock.target);

  // 3. Деплой GovernorContract
  const Governor = await hre.ethers.getContractFactory("GovernorContract");
  const governor = await Governor.deploy(
    voteToken.target,    // address of VoteToken
    timeLock.target      // address of TimeLock
  );
  await governor.waitForDeployment();
  console.log("✅ GovernorContract deployed at:", governor.target);

  // 4. Призначення ролей (Governor → TimeLock)
  const PROPOSER_ROLE = await timeLock.PROPOSER_ROLE();
  const EXECUTOR_ROLE = await timeLock.EXECUTOR_ROLE();
  const ADMIN_ROLE = await timeLock.TIMELOCK_ADMIN_ROLE();

  const tx1 = await timeLock.grantRole(PROPOSER_ROLE, governor.target);
  await tx1.wait();
  const tx2 = await timeLock.grantRole(EXECUTOR_ROLE, hre.ethers.ZeroAddress); // будь-хто може виконувати
  await tx2.wait();
  const tx3 = await timeLock.revokeRole(ADMIN_ROLE, deployer.address); // відкликаємо права адміністратора
  await tx3.wait();

  console.log("🔐 Roles set. DAO structure is now active & secure.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
