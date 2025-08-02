const hre = require("hardhat");

async function main() {
    const hackCoinAddress = "0x25A0FDdad8f33b2E46ffD72f2cb6705386CD5363";
    const hackCoin = await hre.ethers.getContractAt("HackCoin", hackCoinAddress);
    const [deployer] = await hre.ethers.getSigners();
    console.log("Minting tokens from account:", deployer.address);

    const amountToMint = hre.ethers.parseUnits("1000000", 18); // 1M HACK
    const tx = await hackCoin.mint(deployer.address, amountToMint);
    console.log("Mint transaction sent:", tx.hash);
    await tx.wait();
    console.log("Mint completed");

    const balance = await hackCoin.balanceOf(deployer.address);
    console.log(`Balance of ${deployer.address}: ${hre.ethers.formatUnits(balance, 18)} HACK`);
}

main().catch((error) => {
    console.error("Error:", error);
    process.exitCode = 1;
});