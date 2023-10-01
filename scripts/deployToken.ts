import { ethers } from "hardhat"

async function main() {
  const TestToken = await ethers.getContractFactory("TestToken")
  const testToken = await TestToken.deploy("Test Token 1", "TT1")

  await testToken.deployed()

  console.log(`Test Token deployed on ${testToken.address}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
