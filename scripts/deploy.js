
const hre = require("hardhat");

async function main() {



  const Voting = await ethers.getContractFactory("Voting");
  const voting = await Voting.deploy("0xE788b8b2292ACEE6213A4Ae3196A487C47A66F4e", "Loksabha election", 8346347868);


  console.log(
    `Voting Contract is  Deployed to ${voting.target}`
  );
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
