<<<<<<< HEAD
const hre = require("hardhat");

async function main() {
    const daoAddress = "0xA3A50E5327CfeD5118d43c7cE57Bb69176eb5965";
    const dao = await hre.ethers.getContractAt("DAO", daoAddress);
    const [deployer] = await hre.ethers.getSigners();
    console.log("Testing voting from account:", deployer.address);

    const proposalId = "25118259963437862750166479956861181940349037686647939205128824895725212890557"; // Замініть на отриманий proposalId
    const vote = 1; // 1 = За, 0 = Проти, 2 = Утримався
    const tx = await dao.castVote(proposalId, vote);
    console.log("Vote transaction sent:", tx.hash);
    await tx.wait();
    console.log("Vote casted");
}

main().catch((error) => {
    console.error("Error:", error);
    process.exitCode = 1;
=======
const hre = require("hardhat");

async function main() {
    const daoAddress = "0xA3A50E5327CfeD5118d43c7cE57Bb69176eb5965";
    const dao = await hre.ethers.getContractAt("DAO", daoAddress);
    const [deployer] = await hre.ethers.getSigners();
    console.log("Testing voting from account:", deployer.address);

    const proposalId = "25118259963437862750166479956861181940349037686647939205128824895725212890557"; // Замініть на отриманий proposalId
    const vote = 1; // 1 = За, 0 = Проти, 2 = Утримався
    const tx = await dao.castVote(proposalId, vote);
    console.log("Vote transaction sent:", tx.hash);
    await tx.wait();
    console.log("Vote casted");
}

main().catch((error) => {
    console.error("Error:", error);
    process.exitCode = 1;
>>>>>>> ccf2ace45a2d1578f3360b33afd5aee177645eb8
});