const hre = require("hardhat");

async function main() {
    const daoAddress = "0xA3A50E5327CfeD5118d43c7cE57Bb69176eb5965";
    const dao = await hre.ethers.getContractAt("DAO", daoAddress);
    const [deployer] = await hre.ethers.getSigners();
    console.log("Testing DAO from account:", deployer.address);

    const targets = [deployer.address];
    const values = [0];
    const calldatas = ["0x"];
    const description = "Test proposal 2";
    const tx = await dao.propose(targets, values, calldatas, description);
    console.log("Proposal transaction sent:", tx.hash);
    const receipt = await tx.wait();

    // Розпарсити подію ProposalCreated
    const proposalCreatedEvent = receipt.logs.find(
        log => log.topics[0] === hre.ethers.id("ProposalCreated(uint256,address,address[],uint256[],string[],bytes[],uint256,uint256,string)")
    );
    if (!proposalCreatedEvent) {
        throw new Error("ProposalCreated event not found");
    }
    const decodedEvent = dao.interface.parseLog(proposalCreatedEvent);
    const proposalId = decodedEvent.args.proposalId;
    console.log("Proposal ID:", proposalId.toString());
    console.log("Proposal created");
}

main().catch((error) => {
    console.error("Error:", error);
    process.exitCode = 1;
});