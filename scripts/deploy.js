const { ethers, run } = require("hardhat");
// const fs = require("fs-extra");
// require("dotenv").config();

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract... 🚀");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Deployed at address: ${simpleStorage.address}`);
  console.log(network.config);
}

async function verify(contractAddress, args) {
  console.log("verifing contract... 🔍");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructionArgument: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("already verified!!");
    } else {
      console.log(e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
