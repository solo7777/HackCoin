<<<<<<< HEAD
const hre = require("hardhat");
async function main() {
    console.log("Deploying HackCoin...");
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying from account:", deployer.address);
    const HackCoin = await hre.ethers.getContractFactory("HackCoin");
    const hackCoin = await HackCoin.deploy(deployer.address);
    console.log("Transaction sent, waiting for confirmation...");
    await hackCoin.waitForDeployment();
    const hackCoinAddress = await hackCoin.getAddress();
    console.log("HackCoin deployed to:", hackCoinAddress);
}
main().catch((error) => {
    console.error("Deployment failed:", error);
    process.exitCode = 1;
=======
const hre = require("hardhat");
async function main() {
    console.log("Deploying HackCoin...");
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying from account:", deployer.address);
    const HackCoin = await hre.ethers.getContractFactory("HackCoin");
    const hackCoin = await HackCoin.deploy(deployer.address);
    console.log("Transaction sent, waiting for confirmation...");
    await hackCoin.waitForDeployment();
    const hackCoinAddress = await hackCoin.getAddress();
    console.log("HackCoin deployed to:", hackCoinAddress);
}
main().catch((error) => {
    console.error("Deployment failed:", error);
    process.exitCode = 1;
>>>>>>> ccf2ace45a2d1578f3360b33afd5aee177645eb8
});