const { expect } = require("chai");

const getTime = async () => {
  const blockNumBefore = await ethers.provider.getBlockNumber();
  const blockBefore = await ethers.provider.getBlock(blockNumBefore);
  return blockBefore.timestamp;
};

describe("Voting", function () {
  // let addr0;
  // let addr1;
  // let voting;
  // let Voting;
  let voting;
  let owner;
  let voter1;
  let voter2;
  let candidate1;
  let candidate2;

  before(async () => {
    // [addr0, addr1] = await ethers.getSigners();
    [owner, voter1, voter2, candidate1, candidate2] = await ethers.getSigners();


    const Voting = await ethers.getContractFactory("Voting");
    voting = await Voting.deploy(owner, "Loksabha election", 8346347868);
    // await voting.deployed();
  });

  describe("addVoter", () => {
    it("Cannot add voter if not owner", async () => {
      await expect(voting.connect(voter1).addVoter(voter2)).to.be.reverted;
    });
    it("Can add voter", async () => {
      await voting.addVoter(voter1);
      const isAllowed = await voting.voters(voter1);
      expect(isAllowed.isAllowed).to.be.true;
    });

  });

  describe("addCandidate", () => {
    it("Cannot add candidate if not owner", async () => {
      await expect(
        voting.connect(candidate1).addCandidate("", "")).to.be.reverted;
    });



    it("Can add candidate", async () => {
      await voting.addCandidate("Candidate 1", "12345");
      const candidate = await voting.candidates(0);
      expect(candidate.candidate_name).to.equal("Candidate 1");
    });

  });

  describe("Vote", () => {
    it("Cannot vote if not eligible", async () => {
      await expect(voting.connect(voter2).vote(0)).to.be.reverted;
    });


    it("Can vote", async () => {
      await voting.addVoter(voter1.address);
      await voting.addCandidate("Candidate 1", "12345");

      await voting.connect(voter1).vote(0);
      const voter = await voting.voters(voter1.address);
      const candidate = await voting.candidates(0);

      expect(voter.voted).to.be.true;
      expect(candidate.voteCount).to.equal(1);
    });
    it("Cannot vote twice", async () => {
      await expect(voting.connect(voter1).vote(0)).to.be.reverted;
    });

  });
});