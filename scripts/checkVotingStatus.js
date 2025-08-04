const hre = require("hardhat");

async function main() {
    const daoAddress = "0xA3A50E5327CfeD5118d43c7cE57Bb69176eb5965";
    const dao = await hre.ethers.getContractAt("DAO", daoAddress);

    // Отримайте proposalId з попереднього кроку
    const proposalId = "70476261262961686056047688710215440850087324381257436175968831374491387236088"; 
    
    const state = await dao.state(proposalId);
    
    const proposalStateEnum = [
        "Pending", "Active", "Canceled", "Defeated",
        "Succeeded", "Queued", "Expired", "Executed"
    ];

    console.log(`Proposal ID: ${proposalId}`);
    console.log(`Current state: ${proposalStateEnum[state]}`);
    
    if (proposalStateEnum[state] === "Active") {
        console.log("Voting period is still active. Please wait for it to end.");
    } else if (proposalStateEnum[state] === "Succeeded") {
        console.log("Voting period has ended and the proposal has SUCCEEDED!");
        console.log("You can now queue the proposal.");
    } else {
        console.log("The proposal has either been defeated, canceled, or is in a different state.");
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});