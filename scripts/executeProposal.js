const hre = require("hardhat");

async function main() {
    const daoAddress = "0xA3A50E5327CfeD5118d43c7cE57Bb69176eb5965";
    const dao = await hre.ethers.getContractAt("DAO", daoAddress);
    const [deployer] = await hre.ethers.getSigners();
    console.log("Using account:", deployer.address);

    const targets = [deployer.address];
    const values = [0];
    const calldatas = ["0x"];
    const description = "Proposal #2: Mint 100,000 HACK to the deployer";
    const descriptionHash = hre.ethers.id(description);
    
    console.log("Executing proposal...");
    const executeTx = await dao.execute(targets, values, calldatas, descriptionHash);
    await executeTx.wait();
    console.log("Proposal executed successfully!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});