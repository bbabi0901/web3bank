// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "@uniswap/v3-core/contracts/libraries/TransferHelper.sol";

contract DepositAccount {
    address public manager;
    address payable public owner;

    constructor() {
        manager = msg.sender;
    }

    receive() external payable {}

    function withdrawEth(
        address payable recipient,
        uint256 amount
    ) external onlyManager {
        require(
            recipient != address(0),
            "DepositAccount: Invalid recipient address"
        );
        require(
            address(this).balance >= amount,
            "DepositAccount: Insufficient contract balance"
        );

        recipient.transfer(amount);
    }

    function withdrawEth(uint256 amount) external onlyOwner {
        require(
            address(this).balance >= amount,
            "DepositAccount: Insufficient contract balance"
        );

        owner.transfer(amount);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function withdraw(
        address token,
        address to,
        uint256 amount
    ) external onlyManager {
        TransferHelper.safeTransfer(token, to, amount);
    }

    function withdraw(address token, uint256 amount) external onlyOwner {
        TransferHelper.safeTransfer(token, owner, amount);
    }

    function registerOwner(address payable _owner) external onlyManager {
        owner = _owner;
    }

    modifier onlyManager() {
        require(msg.sender == manager, "DepositAccount: Not authorized");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "DepositAccount: Not authorized");
        _;
    }
}
