const hre = require("hardhat");

async function main() {
  const G2Punks = await hre.ethers.getContractFactory("G2Punks");
  const g2Punks = await G2Punks.deploy();

  await g2Punks.deployed();

  console.log(`G2Punks contract deployed to ${g2Punks.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
