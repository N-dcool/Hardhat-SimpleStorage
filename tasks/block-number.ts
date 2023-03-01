import { task } from "hardhat/config";

export default task("block-number", "Prints the current Block Number").setAction(
  async (taskArgs, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber();

    console.log(`Current Block Number: ${blockNumber}`);
  }
);

