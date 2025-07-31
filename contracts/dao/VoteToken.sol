// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract VoteToken is ERC20Votes {
    constructor(string memory name, string memory symbol)
        ERC20(name, symbol)
        ERC20Permit(name)
        EIP712(name, "1")
    {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function _update(address from, address to, uint256 value)
        internal
        virtual
        override(ERC20Votes)
    {
        super._update(from, to, value);
    }

    function nonces(address owner)
        public
        view
        virtual
        override(Nonces)
        returns (uint256)
    {
        return super.nonces(owner);
    }
}
