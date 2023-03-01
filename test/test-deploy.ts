import { ethers } from "hardhat";
import { assert, expect } from "chai";
import {SimpleStorage, SimpleStorage__factory} from "../typechain-types";

describe("SimpleStorage", () => {
  let simpleStorageFactory: SimpleStorage__factory;
  let simpleStorage: SimpleStorage;
  beforeEach(async function () {
    simpleStorageFactory = (await ethers.getContractFactory("SimpleStorage")) as SimpleStorage__factory;
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it("Should start with a favorite number 0", async function () {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";
    assert.equal(currentValue.toString(), expectedValue);
    // or
    // expect(currentValue.toString()).to.equal(expectedValue);
  });
  it("Should update when we call", async function () {
    const expectedValue = "69";
    const transactionResponse = await simpleStorage.store(expectedValue);
    await transactionResponse.wait(1);

    const currentValue = await simpleStorage.retrieve();
    assert.equal(expectedValue, currentValue.toString());
    // or
    // expect(currentValue.toString()).to.equal(expectedValue);
  });
  it("Should store favorite number of a person 2 and should get back same number", async function () {
    const expectedPersonName = "naresh";
    const expectedFavNumber = 2;
    const transactionResponse = await simpleStorage.addPerson(
      expectedPersonName,
      expectedFavNumber
    );
    await transactionResponse.wait(1);
    const { personName, favNumber } = await simpleStorage.people(0);

    assert(expectedFavNumber, favNumber);
    assert(expectedPersonName, personName);
  });
});
