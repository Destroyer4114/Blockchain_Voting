// SPDX-License-Identifier: MIT
pragma solidity >=0.4.0 <0.9.0;

contract Election {
    enum State {
        NotStarted,
        InProgress,
        Ended
    }

    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    address public owner;
    State public electionState;

    struct Voter {
        uint256 id;
        address name;
        string aadhar;
        string phone;
        
    }




    mapping(uint256 => Candidate) candidates;

    mapping(address => bool)  voted;
    mapping(address => bool) isVoter;
    mapping(address => Voter) voters;


    uint256 public candidatesCount = 0;

    uint256 public votersCount = 0;
    uint256 public voteCount = 0;


    
    constructor() {
        owner = msg.sender;
        electionState = State.NotStarted;
       
    }

    event Voted(uint256 indexed _candidateId);

    function startElection() public {
        require(msg.sender == owner);
        require(electionState == State.NotStarted);
        electionState = State.InProgress;
    }

    function endElection() public {
        require(msg.sender == owner);
        require(electionState == State.InProgress);
        electionState = State.Ended;
    }

    function addCandidate(string memory _name) public {
        require(owner == msg.sender, "Only owner can add candidates");
        require(
            electionState == State.NotStarted,
            "Election has already started"
        );

        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
        candidatesCount++;
    }

    function addVoter(address _voter, string memory _aadhar, string memory _phone ) public {
        require(owner == msg.sender, "Only owner can add voter");
        require(!isVoter[_voter], "Voter already added");
        require(
            electionState == State.NotStarted,
            "Voter can't be added after election started"
        );

        isVoter[_voter] = true;
        voters[_voter] = Voter(votersCount, _voter, _aadhar, _phone);
        votersCount++;
    }

    function getRole(address _current) public view returns (uint256) {
        if (owner == _current) {
            return 1;
        } else if (isVoter[_current]) {
            return 2;
        } else {
            return 3;
        }
    }

    function vote(uint256 _candidateId) public {
        require(
            electionState == State.InProgress,
            "Election is not in progress"
        );
        require(isVoter[msg.sender], "Non authorised user cannot vote");
        require(!voted[msg.sender], "You have already voted");
        require(
            _candidateId >= 0 && _candidateId < candidatesCount,
            "Invalid candidate ID"
        );

        candidates[_candidateId].voteCount++;
        voted[msg.sender] = true;
        voteCount++;

        emit Voted(_candidateId);
    }

    function isvoted(address _current) public view returns ( bool) {
        require(!voted[_current], "You have already voted");
        
        return voted[_current];
        
    }

     

    function getCandidateDetails(uint256 _candidateId)
        public
        view
        returns (string memory, uint256)
    {
        require(
            _candidateId >= 0 && _candidateId < candidatesCount,
            "Invalid candidate ID"
        );
        return (
            candidates[_candidateId].name,
            candidates[_candidateId].voteCount
        );
    }


    
    function getVoterDetails(address _voterId)
        public
        view
        returns (string memory, string memory)
    {
        require(
            isVoter[_voterId] ,
            "Invalid voter ID"
        );
        return (
            voters[_voterId].aadhar,
            voters[_voterId].phone
        );
    }

     function getTurnout(address _current)
        public
        view
        returns (uint256, uint256)
    {
        require(
            (owner == _current) ,
            "Only admin access"
        );
        return (
            voteCount,
            votersCount
        );
    }

    function compare(string memory str1, string memory str2) public pure returns (bool) {
        if (bytes(str1).length != bytes(str2).length) {
            return false;
        }
        return keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2));
    }

    function checkHash(address _voterId,string memory _aadhar, string memory _phone)
        public
        view
        returns (uint256)
    {
        require(
            isVoter[_voterId] ,
            "Invalid voter ID"
        );
        
        if( compare( voters[_voterId].aadhar , _aadhar) && compare( voters[_voterId].phone,_phone))
        {
            return 1;
        }
        else{
            return 0;
        }
    }
}
