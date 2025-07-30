// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

/// @title VoteToken — DAO-compatible voting token
contract VoteToken is ERC20Votes {
    constructor()
        ERC20("HackDAO Vote Token", "HVT")
        ERC20Votes()
    {
        _mint(msg.sender, 1_000_000 * 10 ** decimals()); // Початкова емісія
    }

    // Обов’язкові перевизначення для ERC20Votes
    function _afterTokenTransfer(address from, address to, uint256 amount)
        internal override(ERC20, ERC20Votes)
    {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount)
        internal override(ERC20, ERC20Votes)
    {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount)
        internal override(ERC20, ERC20Votes)
    {
        super._burn(account, amount);
    }
}
