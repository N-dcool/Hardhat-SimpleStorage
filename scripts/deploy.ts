import { ethers, run, network } from "hardhat";
// const fs = require("fs-extra");
// require("dotenv").config();

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract... 🚀");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Deployed at address: ${simpleStorage.address}`);
  //console.log(network.config.chainId === 5);
  if (network.config.chainId === 5) {
    console.log("Waiting for block confirmation");
    console.log("verifing contract... 🔍");
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
    console.log("Your contract is been verified ✔️🥳");
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(`current favorite number : ${currentValue}`);
  // Update the current value :
  const transactionResponse = await simpleStorage.store(19131043);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated Value : ${updatedValue}`);
}

async function verify(contractAddress: string, args: any[]) {
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e: any) {
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
