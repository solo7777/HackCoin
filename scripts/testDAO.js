const hre = require("hardhat");

async function main() {
    // Вставте адреси ваших розгорнутих контрактів
    const hackCoinAddress = "0x25A0FDdad8f33b2E46ffD72f2cb6705386CD5363";
    const daoAddress = "0xA3A50E5327CfeD5118d43c7cE57Bb69176eb5965";
    const timelockAddress = "0x248c9Db116A58587b8225CBfE183bbB82ED6966A"; // Не використовується в цьому скрипті, але варто мати

    const [deployer] = await hre.ethers.getSigners();
    console.log("Testing DAO from account:", deployer.address);

    // 1. Отримати екземпляр контракту токена HackCoin
    const hackCoin = await hre.ethers.getContractAt("HackCoin", hackCoinAddress);

    // 2. Делегування права голосу
    // Це найважливіший крок, який дозволяє вашому обліковому запису мати достатньо голосів для створення пропозиції
    console.log("Delegating votes from", deployer.address, "to itself...");
    const delegateTx = await hackCoin.delegate(deployer.address);
    await delegateTx.wait();
    console.log("Votes delegated successfully!");

    // 3. Отримати екземпляр контракту DAO
    const dao = await hre.ethers.getContractAt("DAO", daoAddress);

    // 4. Створення пропозиції
    const targets = [deployer.address]; // Приклад: пропозиція надіслати кошти на адресу розгортача
    const values = [0]; // 0 ETH
    const calldatas = ["0x"]; // Без даних
    const description = "Test proposal for HackCoinDAO";

    console.log("Creating a new proposal...");
    const proposeTx = await dao.propose(targets, values, calldatas, description);
    console.log("Proposal transaction sent:", proposeTx.hash);
    await proposeTx.wait();
    console.log("Proposal created successfully!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});