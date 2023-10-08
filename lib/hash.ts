import { utils } from "ethers"

const PREFIX = "0xff"

export const keccak256 = (data: string) => {
  const dataAsByte = utils.toUtf8Bytes(data)
  return utils.keccak256(dataAsByte)
}

export const numToBytes32 = (data: number) => {
  return utils.hexZeroPad(utils.hexlify(data), 32)
}

export const getCreate2Address = (
  factoryAddress: string,
  bytecode: string,
  salt: number
) => {
  return utils.getCreate2Address(
    factoryAddress,
    numToBytes32(salt),
    utils.keccak256(bytecode)
  )
}
