import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_API_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const contractAddress = "0x4c62a060facdD0f7fEb592dCBBEc15C8f584A9c0";
  const abi = [
    "function mint(address to, uint256 amount) public",
    "function burn(uint256 amount) public",
    "function balanceOf(address account) public view returns (uint256)"
  ];

  const token = new ethers.Contract(contractAddress, abi, wallet);

  const to = wallet.address;
  const mintAmount = ethers.parseUnits("1000", 18); // 1000 HKC

  console.log("💰 Minting tokens...");
  const mintTx = await token.mint(to, mintAmount);
  await mintTx.wait();
  console.log(`✅ Minted to ${to}`);

  let balance = await token.balanceOf(to);
  console.log(`🔎 Balance after mint: ${ethers.formatUnits(balance, 18)} HKC`);

  const burnAmount = ethers.parseUnits("500", 18); // 500 HKC

  console.log("🔥 Burning tokens...");
  const burnTx = await token.burn(burnAmount);
  await burnTx.wait();
  console.log("✅ Burn complete.");

  balance = await token.balanceOf(to);
  console.log(`📉 Balance after burn: ${ethers.formatUnits(balance, 18)} HKC`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
