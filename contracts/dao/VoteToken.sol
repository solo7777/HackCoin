// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract VoteToken is ERC20Votes {
    constructor()
        ERC20("HackDAO Vote Token", "HVT")
        ERC20Permit("HackDAO Vote Token")
    {
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }

    function _afterTokenTransfer(address from, address to, uint256 amount)
        internal override(ERC20Votes)
    {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount)
        internal override(ERC20Votes)
    {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount)
        internal override(ERC20Votes)
    {
        super._burn(account, amount);
    }

    function _update(address from, address to, uint256 amount)
        internal override(ERC20Votes)
    {
        super._update(from, to, amount);
    }

    function nonces(address owner)
        public view override(ERC20Permit)
        returns (uint256)
    {
        return super.nonces(owner);
    }
}
