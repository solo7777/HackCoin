const hre = require("hardhat");

async function main() {
    // Вставте адресу розгорнутого контракту DAO
    const daoAddress = "0xA3A50E5327CfeD5118d43c7cE57Bb69176eb5965";
    // Вставте адресу розгорнутого контракту HackCoin
    const hackCoinAddress = "0x25A0FDdad8f33b2E46ffD72f2cb6705386CD5363"; // <-- ВАЖЛИВО! Замініть це на фактичну адресу

    const dao = await hre.ethers.getContractAt("DAO", daoAddress);
    const hackCoin = await hre.ethers.getContractAt("HackCoin", hackCoinAddress);

    const [signer] = await hre.ethers.getSigners();
    const account = signer.address;

    // Вставте proposalId, який ви отримали
    const proposalId = "70476261262961686056047688710215440850087324381257436175968831374491387236088"; 

    // Отримати поточний стан пропозиції
    const state = await dao.state(proposalId);
    const proposalStateEnum = [
        "Pending", "Active", "Canceled", "Defeated",
        "Succeeded", "Queued", "Expired", "Executed"
    ];

    // Отримати баланс токенів
    const tokenBalance = await hackCoin.balanceOf(account);
    // Отримати кількість делегованих голосів
    const votes = await hackCoin.getVotes(account);
    
    // Отримати поріг пропозиції з контракту DAO (для порівняння)
    const proposalThreshold = await dao.proposalThreshold();
    const quorum = await dao.quorum(0); // Передаємо 0, оскільки в контракті це просто pure функція

    console.log(`Checking account: ${account}`);
    console.log(`Token Balance: ${hre.ethers.formatUnits(tokenBalance, 18)} HACK`);
    console.log(`Delegated Votes: ${hre.ethers.formatUnits(votes, 18)} HACK`);
    console.log("-----------------------------------------");
    console.log(`Proposal ID: ${proposalId}`);
    console.log(`Current state: ${proposalStateEnum[state]}`);
    console.log(`Proposal Threshold: ${hre.ethers.formatUnits(proposalThreshold, 18)} HACK`);
    console.log(`Quorum: ${hre.ethers.formatUnits(quorum, 18)} HACK`);
    console.log("-----------------------------------------");

    if (votes < proposalThreshold) {
      console.log("!!! ATTENTION: You do not have enough delegated votes to create a proposal. This might be the cause of the `execution reverted` error.");
    }

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});