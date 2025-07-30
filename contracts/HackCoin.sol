// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title HackCoin — Token of the Free Internet Community
contract HackCoin is ERC20Votes, Ownable {
    uint256 public constant MAX_SUPPLY = 4_000_000 * 10 ** 18;

    constructor()
        ERC20("HackCoin", "HKC")
        ERC20Votes()
    {
        _mint(msg.sender, 3_950_000 * 10 ** decimals());
    }

    /// @notice Mint new tokens (only owner)
    function mint(address to, uint256 amount) public onlyOwner {
        uint256 amountWithDecimals = amount * 10 ** decimals();
        require(totalSupply() + amountWithDecimals <= MAX_SUPPLY, "Exceeds max supply");
        _mint(to, amountWithDecimals);
    }

    /// @notice Burn your tokens
    function burn(uint256 amount) public {
        _burn(msg.sender, amount * 10 ** decimals());
    }

    // === Overrides required for ERC20Votes ===

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

    function _burn(address account, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._burn(account, amount);
    }
}
