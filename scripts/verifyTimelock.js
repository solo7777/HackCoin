const hre = require("hardhat");

async function main() {
    const contractAddress = "0x248c9Db116A58587b8225CBfE183bbB82ED6966A";
    const constructorArguments = [
        3600,
        ["0xb47e41F6BE46dB20d55eE2d35AfEd227e9178010"],
        ["0xb47e41F6BE46dB20d55eE2d35AfEd227e9178010"]
    ];
    console.log("Verifying Timelock.sol at:", contractAddress);
    await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: constructorArguments,
        contract: "contracts/Timelock.sol:Timelock"
    });
    console.log("Verification completed");
}

main().catch((error) => {
    console.error("Error:", error);
    process.exitCode = 1;
});