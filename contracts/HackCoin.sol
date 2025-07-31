// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract HackCoin is ERC20, ERC20Permit, ERC20Votes, Ownable {
    uint256 public maxSupply = 4000000 * 10 ** decimals(); // 4 млн токенів із 18 десятковими знаками

    constructor(uint256 initialSupply) 
        ERC20("HackCoin", "HCK")
        ERC20Permit("HackCoin")
        Ownable(msg.sender)
    {
        require(initialSupply <= maxSupply, "Initial supply exceeds max supply");
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply() + amount * 10 ** decimals() <= maxSupply, "Exceeds max supply");
        _mint(to, amount * 10 ** decimals());
    }

    // Перевизначення _update для ERC20Votes
    function _update(address from, address to, uint256 value) 
        internal 
        override(ERC20, ERC20Votes) 
    {
        super._update(from, to, value);
    }

    // Перевизначення nonces для ERC20Permit
    function nonces(address owner) public view override(ERC20Permit, Nonces) returns (uint256) {
        return super.nonces(owner);
    }
}
