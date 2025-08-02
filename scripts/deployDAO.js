const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying from account:", deployer.address);

    // Розгортання Timelock
    const minDelay = 3600; // 1 година
    const proposers = [deployer.address];
    const executors = [deployer.address];
    const Timelock = await hre.ethers.getContractFactory("Timelock");
    const timelock = await Timelock.deploy(minDelay, proposers, executors);
    await timelock.waitForDeployment();
    const timelockAddress = await timelock.getAddress();
    console.log("Timelock deployed to:", timelockAddress);

    // Розгортання DAO
    const tokenAddress = "0x25A0FDdad8f33b2E46ffD72f2cb6705386CD5363";
    const DAO = await hre.ethers.getContractFactory("DAO");
    const dao = await DAO.deploy(tokenAddress, timelockAddress);
    await dao.waitForDeployment();
    const daoAddress = await dao.getAddress();
    console.log("DAO deployed to:", daoAddress);
}

main().catch((error) => {
    console.error("Deployment failed:", error);
    process.exitCode = 1;
});