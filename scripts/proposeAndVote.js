const hre = require("hardhat");

async function main() {
    // Вставте адреси ваших розгорнутих контрактів
    const hackCoinAddress = "0x25A0FDdad8f33b2E46ffD72f2cb6705386CD5363";
    const daoAddress = "0xA3A50E5327CfeD5118d43c7cE57Bb69176eb5965";
    const timelockAddress = "0x248c9Db116A58587b8225CBfE183bbB82ED6966A";

    const [deployer] = await hre.ethers.getSigners();
    console.log("Using account:", deployer.address);

    const hackCoin = await hre.ethers.getContractAt("HackCoin", hackCoinAddress);
    const dao = await hre.ethers.getContractAt("DAO", daoAddress);

    // 1. Делегування права голосу (на всяк випадок, якщо це ще не зроблено)
    console.log("Delegating votes...");
    const delegateTx = await hackCoin.delegate(deployer.address);
    await delegateTx.wait();
    console.log("Delegation successful!");

    // 2. Створення пропозиції
    const targets = [deployer.address];
    const values = [0];
    const calldatas = [hackCoin.interface.encodeFunctionData("mint", [deployer.address, hre.ethers.parseEther("100000")])];
    const description = "Proposal #2: Mint 100,000 HACK to the deployer";
    const descriptionHash = hre.ethers.id(description);

    console.log("Creating a new proposal...");
    const proposeTx = await dao.propose(targets, values, calldatas, description);
    const proposeReceipt = await proposeTx.wait();
    const proposalId = proposeReceipt.logs[0].args.proposalId;
    console.log(`Proposal created with ID: ${proposalId}`);

    // 3. Чекаємо, поки пропозиція стане активною (це займає 1 блок)
    console.log("Waiting for 1 block for the proposal to become active...");
    await new Promise(resolve => setTimeout(resolve, 30000)); // Затримка 30 секунд для 1 блоку

    // 4. Голосування за пропозицію
    console.log("Casting vote...");
    const voteTx = await dao.castVote(proposalId, 1); // 1 = За
    await voteTx.wait();
    console.log("Vote cast successfully!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});