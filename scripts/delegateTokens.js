const hre = require("hardhat");

async function main() {
    const hackCoinAddress = "0x25A0FDdad8f33b2E46ffD72f2cb6705386CD5363";
    const hackCoin = await hre.ethers.getContractAt("HackCoin", hackCoinAddress);
    const [deployer] = await hre.ethers.getSigners();
    console.log("Delegating tokens from account:", deployer.address);

    const tx = await hackCoin.delegate(deployer.address);
    console.log("Delegate transaction sent:", tx.hash);
    await tx.wait();
    console.log("Delegation completed");

    const votes = await hackCoin.getVotes(deployer.address);
    console.log(`Votes for ${deployer.address}: ${hre.ethers.formatUnits(votes, 18)} HACK`);
}

main().catch((error) => {
    console.error("Error:", error);
    process.exitCode = 1;
});