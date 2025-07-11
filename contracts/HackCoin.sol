// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title HackCoin - Token of the Free Internet Community
/// @author Solo
/// @notice This is a simple ERC20 token representing the spirit of hackers and digital freedom.

contract HackCoin is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("HackCoin", "HCK") {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    /// @notice Mint new tokens (only owner)
    /// @param to Address to receive tokens
    /// @param amount Amount of tokens (in whole units)
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount * 10 ** decimals());
    }
}
