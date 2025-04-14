import React, { useState, useEffect } from "react";
import { BrowserProvider, Contract } from "ethers";

export default function HealthCare() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [owner, setOwner] = useState(null);

  const contractAddress = "0xf6c6889a717d5712596926667dfd626f0f720695";
  const contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "patientID",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_diagnosis",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_treatment",
          "type": "string"
        }
      ],
      "name": "addRecord",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_provider",
          "type": "address"
        }
      ],
      "name": "authorizeProvider",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getOwner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "patientID",
          "type": "uint256"
        }
      ],
      "name": "getRecords",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "recordID",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "diagnosis",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "treatment",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "internalType": "struct HealthCare.Record[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  useEffect(() => {
    const init = async () => {
      try {
        const { ethereum } = window;
        if (!ethereum) {
          console.log("Please install MetaMask!");
          return;
        }

        const provider = new BrowserProvider(ethereum);
        const signer = await provider.getSigner();

        const contractInstance = new Contract(contractAddress, contractABI, signer);
        setContract(contractInstance);

        const address = await signer.getAddress();
        setAccount(address);

        const ownerAddress = await contractInstance.getOwner();
        setOwner(ownerAddress);
      } catch (err) {
        console.error("Error initializing contract:", err);
      }
    };

    init();
  }, []);

  return (
    <div>
      <h2>HealthCare</h2>
      <p><strong>Connected Account:</strong> {account}</p>
      <p><strong>Contract Owner:</strong> {owner}</p>
    </div>
  );
}
