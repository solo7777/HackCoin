// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract TimeLock is TimelockController {
    constructor(
        uint256 minDelay,                 // затримка у секундах (наприклад, 3600 = 1 година)
        address[] memory proposers,      // хто може пропонувати рішення
        address[] memory executors       // хто може виконувати рішення
    )
        TimelockController(minDelay, proposers, executors)
    {}
}
