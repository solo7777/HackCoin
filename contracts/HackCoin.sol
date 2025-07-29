// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title HackCoin - Token of the Free Internet Community (DAO-enabled)
contract HackCoin is ERC20Votes, Ownable {
    uint256 public constant MAX_SUPPLY = 4_000_000 * 10 ** 18;

    constructor(uint256 initialSupply)
        ERC20("HackCoin", "HKC")
        ERC20Permit("HackCoin") // Дозволяє підписувати офчейн голоси
    {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    /// @notice Mint new tokens (only owner), within cap
    function mint(address to, uint256 amount) public onlyOwner {
        uint256 amountWithDecimals = amount * 10 ** decimals();
        require(totalSupply() + amountWithDecimals <= MAX_SUPPLY, "Exceeds max supply");
        _mint(to, amountWithDecimals);
    }

    /// @notice Burn tokens from caller
    function burn(uint256 amount) public {
        _burn(msg.sender, amount * 10 ** decimals());
    }

    // --- Overrides for ERC20Votes (вимагає OpenZeppelin) ---
    function _afterTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._mint(to, amount);
    }

    function _burn(address from, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._burn(from, amount);
    }
}
