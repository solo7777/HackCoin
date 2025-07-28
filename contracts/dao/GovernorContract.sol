// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

// Імпортуємо базові контракти від OpenZeppelin
import "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";

/// @title HackCoinGovernor — DAO-контракт для управління проєктом HackCoin
/// @notice Цей контракт дозволяє власникам токенів брати участь у голосуванні
contract HackCoinGovernor is
    GovernorSettings,
    GovernorCountingSimple,
    GovernorVotes,
    GovernorVotesQuorumFraction,
    GovernorTimelockControl
{
    /// @dev Ім'я DAO (використовується у Tally)
    constructor(IVotes _token, TimelockController _timelock)
        Governor("HackCoinDAO")
        GovernorSettings(1 /* 1 блок на запуск */, 45818 /* ~1 тиждень */, 0)
        GovernorVotes(_token)
        GovernorVotesQuorumFraction(4) // Порог голосування: 4% від загальної кількості токенів
        GovernorTimelockControl(_timelock)
    {}

    // Мінімальна кількість голосів "за", щоб пропозиція пройшла
    function quorum(uint256 blockNumber) public view override(Governor, GovernorVotesQuorumFraction) returns (uint256) {
        return super.quorum(blockNumber);
    }

    // Хто може створювати пропозиції (за замовчуванням: будь-хто з токенами)
    function proposalThreshold() public view override(Governor, GovernorSettings) returns (uint256) {
        return super.proposalThreshold();
    }

    // Як ми рахуємо голоси (проста більшість)
    function _countVotes(uint256 proposalId) internal view override returns (uint256) {
        return super._countVotes(proposalId);
    }

    // Виклик таймлоку
    function state(uint256 proposalId) public view override(Governor, GovernorTimelockControl) returns (ProposalState) {
        return super.state(proposalId);
    }

    function propose(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        string memory description
    ) public override(Governor) returns (uint256) {
        return super.propose(targets, values, calldatas, description);
    }

    function _execute(
        uint256 proposalId,
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) {
        super._execute(proposalId, targets, values, calldatas, descriptionHash);
    }

    function _cancel(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) returns (uint256) {
        return super._cancel(targets, values, calldatas, descriptionHash);
    }

    function supportsInterface(bytes4 interfaceId) public view override(Governor, GovernorTimelockControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
