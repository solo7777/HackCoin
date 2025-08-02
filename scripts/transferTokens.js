const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const tokenAddress = "0x25A0FDdad8f33b2E46ffD72f2cb6705386CD5363"; // HackCoin.sol
    const recipientAddress = "0xE13B0919D07525D78C37a0d9B812376Ccc1F0074"; // Замініть
    const amount = hre.ethers.parseUnits("1000", 18); // 1000 HACK

    const token = await hre.ethers.getContractAt("HackCoin", tokenAddress, deployer);
    console.log("Transferring tokens from:", deployer.address);

    const tx = await token.transfer(recipientAddress, amount);
    console.log("Transfer transaction sent:", tx.hash);
    await tx.wait();
    console.log(`Transferred ${hre.ethers.formatUnits(amount, 18)} HACK to ${recipientAddress}`);
}

main().catch((error) => {
    console.error("Error:", error);
    process.exitCode = 1;
});