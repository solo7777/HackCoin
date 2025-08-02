// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";

contract DAO is Governor, GovernorCountingSimple, GovernorVotes, GovernorTimelockControl {
    constructor(IVotes _token, TimelockController _timelock)
        Governor("HackCoinDAO")
        GovernorVotes(_token)
        GovernorTimelockControl(_timelock)
    {}

    // Сигнатура `_queueOperations` виправлена, повертає `uint48`
    function _queueOperations(
        uint256 proposalId,
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal virtual override(Governor, GovernorTimelockControl) returns (uint48) {
        return super._queueOperations(proposalId, targets, values, calldatas, descriptionHash);
    }
    
    function _executeOperations(
        uint256 proposalId,
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal virtual override(Governor, GovernorTimelockControl) {
        super._executeOperations(proposalId, targets, values, calldatas, descriptionHash);
    }

    function _cancel(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal virtual override(Governor, GovernorTimelockControl) returns (uint256) {
        return super._cancel(targets, values, calldatas, descriptionHash);
    }

    function _executor() internal view virtual override(Governor, GovernorTimelockControl) returns (address) {
        return super._executor();
    }
    
    function _getVotes(
        address account,
        uint256 blockNumber,
        bytes memory params
    ) internal view virtual override(Governor, GovernorVotes) returns (uint256) {
        return super._getVotes(account, blockNumber, params);
    }
    
    // Виправлення: supportsInterface перевизначає лише Governor
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(Governor)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // `state` та `proposalNeedsQueuing` перевизначають обидва контракти
    function state(uint256 proposalId) public view override(Governor, GovernorTimelockControl) returns (ProposalState) {
        return super.state(proposalId);
    }

    function proposalNeedsQueuing(uint256 proposalId) public view override(Governor, GovernorTimelockControl) returns (bool) {
        return super.proposalNeedsQueuing(proposalId);
    }
    
    // Решта функцій без змін
    function votingDelay() public pure override returns (uint256) {
        return 1;
    }

    function votingPeriod() public pure override returns (uint256) {
        return 45818;
    }

    function quorum(uint256) public pure override returns (uint256) {
        return 4_000_000 * 10**18;
    }

    function proposalThreshold() public pure override returns (uint256) {
        return 1_000_000 * 10**18;
    }
}