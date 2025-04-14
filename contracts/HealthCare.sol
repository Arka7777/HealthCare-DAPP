// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

contract HealthCare{
    address owner;

    struct Record{
        uint256 recordID;
        string name;
        string diagnosis;
        string treatment;
        uint256 timestamp;
    }

    mapping (uint256=>Record[])private patientRecord;
    mapping (address=>bool) private authorizedProvider;

    modifier onlyOwner(){
        require(msg.sender==owner,"only owner can perform");
        _;
    }

    modifier onlyAuthorizedProvider(){
        require(authorizedProvider[msg.sender],"not an authorized provder");
        _;
    }
    constructor(){
        owner=msg.sender;

    }

    function getOwner()public  view  returns (address){
        return  owner;
    }
    function authorizeProvider(address _provider ) public onlyOwner{
        authorizedProvider[_provider]=true;
    }

    function addRecord(uint256 patientID,string memory _name,string memory _diagnosis , string memory _treatment)public onlyAuthorizedProvider{
        uint256 recordID=patientRecord[patientID].length+1;
        patientRecord[patientID].push(Record(recordID,_name,_diagnosis,_treatment,block.timestamp));

    }

    function getRecords(uint256 patientID) public view onlyAuthorizedProvider returns (Record[] memory){
        return  patientRecord[patientID];
    }
}
//0xf6c6889a717d5712596926667dfd626f0f720695
//remix id pe kiya tha