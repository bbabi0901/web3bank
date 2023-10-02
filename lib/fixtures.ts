import { ethers } from "hardhat"
import { Wallet } from "ethers"

import { DepositAccount, TestToken } from "../typechain-types"

interface TestTokenFixture {
  testToken: TestToken
}

export const testTokenFixture = async (
  name: string,
  symbol: string
): Promise<TestTokenFixture> => {
  const TestToken = await ethers.getContractFactory("TestToken")
  const testToken = await TestToken.deploy(name, symbol)
  return { testToken }
}

interface DepositAccountFixture extends TestTokenFixture {
  depositAccount: DepositAccount
}

export const depositAccountFixture = async ([
  deployer,
]: Wallet[]): Promise<DepositAccountFixture> => {
  const DepositAccount = await ethers.getContractFactory(
    "DepositAccount",
    deployer
  )
  const depositAccount = await DepositAccount.deploy()
  const { testToken } = await testTokenFixture("TestToken", "TTK")
  return { depositAccount, testToken }
}
