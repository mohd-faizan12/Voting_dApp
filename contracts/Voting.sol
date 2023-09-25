// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Voting {
    //election_authority's address
    address public election_authority;
    string public election_name;
    uint256 public election_Endtime;

    //counter of number of candidates
    uint256 private numCandidates;

    //counter of number of voters
    uint256 numVoters;

    //election_authority's address taken when it deploys the contract
    constructor(
        address authority,
        string memory name,
        uint256 election_endtime
    ) {
        election_authority = authority;
        election_name = name;
        election_Endtime = election_endtime;
    }

    //candidate election_description
    struct Candidate {
        string candidate_name;
        string candidate_Adhaar;
        uint8 voteCount;
    }

    //voter election_description
    struct Voter {
        uint8 candidate_id_voted;
        bool isAllowed;
        bool voted;
    }

    //candidate mapping
    mapping(uint256 => Candidate) public candidates;

    //voter mapping
    mapping(address => Voter) public voters;

    event candidateID(uint256 _Id);
    event voterAdded(address _user, uint256 createdAt);

    //Only election_authority can call this function
    modifier OnlyOwner() {
        require(msg.sender == election_authority, "Error: Access Denied.");
        _;
    }

    //election should not be over
    modifier notOver() {
        require(
            block.timestamp < election_Endtime,
            "Election time period is over"
        );
        _;
    }

    //function to add candidate to mapping
    function addVoter(address _user) public OnlyOwner {
        voters[_user].isAllowed = true;
        emit voterAdded(_user, block.timestamp);
    }

    function addCandidate(
        string memory candidate_name,
        string memory candidate_Adhaar
    ) public OnlyOwner {
        uint256 candidate_ID = numCandidates++; //assign id of the candidate
        candidates[candidate_ID] = Candidate(
            candidate_name,
            candidate_Adhaar,
            0
        ); //add the values to the mapping
        emit candidateID(candidate_ID);
    }

    //function to - vote ,check for double voting, & check for eligibility
    function vote(uint8 _candidateID) public {
        require(voters[msg.sender].isAllowed, "You are not eligible to vote");

        //if false the vote will be registered
        require(!voters[msg.sender].voted, "Error:You cannot double vote");

        voters[msg.sender].candidate_id_voted = _candidateID; //add the values to the mapping
        voters[msg.sender].voted = true; //add the values to the mapping
        numVoters++;
        candidates[_candidateID].voteCount++; //increment vote counter of candidate
    }

    //function to get count of candidates
    function getNumOfCandidates() public view returns (uint256) {
        return numCandidates;
    }

    //function to get count of voters
    function getNumOfVoters() public view returns (uint256) {
        return numVoters;
    }

    //function to get candidate information
    function getCandidate(uint8 _candidateID)
        public
        view
        returns (
            string memory,
            string memory,
            uint8
        )
    {
        return (
            candidates[_candidateID].candidate_name,
            candidates[_candidateID].candidate_Adhaar,
            candidates[_candidateID].voteCount
        );
    }

    //function to return winner candidate information
    function winnerCandidate() public view notOver returns (uint8) {
        uint8 largestVotes = candidates[0].voteCount;
        uint8 candidateId;
        for (uint8 i = 1; i < numCandidates; i++) {
            if (largestVotes < candidates[i].voteCount) {
                largestVotes = candidates[i].voteCount;
                candidateId = i;
            }
        }
        return (candidateId);
    }

    function getElectionDetails() public view returns (string memory) {
        return (election_name);
    }
}
