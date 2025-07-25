const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("HackCoin contract", function () {
  let HackCoin, hackCoin, owner, addr1, addr2;
  const initialSupply = ethers.parseUnits("4000000", 18); // 1 млн токенів

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    HackCoin = await ethers.getContractFactory("HackCoin");
    hackCoin = await HackCoin.deploy();
    await hackCoin.waitForDeployment();
  });

  it("should assign the total supply to the owner", async function () {
    const ownerBalance = await hackCoin.balanceOf(owner.address);
    const totalSupply = await hackCoin.totalSupply();
    expect(ownerBalance).to.equal(totalSupply);
  });

  it("should transfer tokens between accounts", async function () {
    await hackCoin.transfer(addr1.address, ethers.parseUnits("1000", 18));
    const addr1Balance = await hackCoin.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(ethers.parseUnits("1000", 18));
  });

  it("should emit a Transfer event when tokens are transferred", async function () {
    const amount = ethers.parseUnits("1000", 18);
    await expect(hackCoin.transfer(addr1.address, amount))
      .to.emit(hackCoin, "Transfer")
      .withArgs(owner.address, addr1.address, amount);
  });

  it("should fail if sender doesn’t have enough tokens", async function () {
    await expect(
      hackCoin.connect(addr1).transfer(owner.address, 1)
    ).to.be.reverted;
  });

  it("should approve tokens for delegated transfer", async function () {
    const amount = ethers.parseUnits("500", 18);
    await expect(hackCoin.approve(addr1.address, amount))
      .to.emit(hackCoin, "Approval")
      .withArgs(owner.address, addr1.address, amount);

    const allowance = await hackCoin.allowance(owner.address, addr1.address);
    expect(allowance).to.equal(amount);
  });

  it("should allow transferFrom by approved spender", async function () {
    const amount = ethers.parseUnits("300", 18);

    await hackCoin.approve(addr1.address, amount);

    await expect(
      hackCoin.connect(addr1).transferFrom(owner.address, addr2.address, amount)
    ).to.emit(hackCoin, "Transfer")
     .withArgs(owner.address, addr2.address, amount);

    const addr2Balance = await hackCoin.balanceOf(addr2.address);
    expect(addr2Balance).to.equal(amount);
  });

  it("should fail if spender exceeds allowance", async function () {
    const approved = ethers.parseUnits("100", 18);
    const tryAmount = ethers.parseUnits("200", 18);

    await hackCoin.approve(addr1.address, approved);

    await expect(
      hackCoin.connect(addr1).transferFrom(owner.address, addr2.address, tryAmount)
    ).to.be.reverted;
  });

  it("should allow owner to mint tokens", async function () {
    const mintAmount = ethers.parseUnits("5000", 18);
    const supplyBefore = await hackCoin.totalSupply();

    await hackCoin.mint(owner.address, mintAmount);

    const supplyAfter = await hackCoin.totalSupply();
    const ownerBalance = await hackCoin.balanceOf(owner.address);

    expect(supplyAfter).to.equal(supplyBefore + mintAmount);
    expect(ownerBalance).to.equal(supplyAfter);
  });

  it("should allow user to burn their tokens", async function () {
    const burnAmount = ethers.parseUnits("1000", 18);
    const supplyBefore = await hackCoin.totalSupply();

    await hackCoin.burn(burnAmount);

    const supplyAfter = await hackCoin.totalSupply();
    const balanceAfter = await hackCoin.balanceOf(owner.address);

    expect(supplyAfter).to.equal(supplyBefore - burnAmount);
    expect(balanceAfter).to.equal(supplyAfter);
  });
});
