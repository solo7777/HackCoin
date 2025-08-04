// checkContractAddress.js
     const hre = require("hardhat");

     async function main() {
         // Get deployer account
         const [deployer] = await hre.ethers.getSigners();
         const tokenAddress = "0x25A0FDdad8f33b2E46ffD72f2cb6705386CD5363"; // HackCoin address

         // Connect to HackCoin contract
         const token = await hre.ethers.getContractAt("HackCoin", tokenAddress, deployer);
         console.log("HackCoin contract address:", tokenAddress);
         console.log("Contract name:", await token.name());
         console.log("Contract symbol:", await token.symbol());
         console.log("Total supply:", hre.ethers.formatUnits(await token.totalSupply(), 18), "HACK");
     }

     main().catch((error) => {
         console.error("Error:", error);
         process.exitCode = 1;
     });