

import React, { useState, useEffect } from "react";
import { BrowserProvider, Contract } from "ethers";

export default function HealthCare() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [owner, setOwner] = useState(null);
  const [patientID, setPatientID] = useState("");
  const [name, setName] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [records, setRecords] = useState([]);
  const [searchPatientID, setSearchPatientID] = useState("");

  const contractAddress = "0xf6c6889a717d5712596926667dfd626f0f720695";
  const contractABI =[
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
          alert("Please install MetaMask!");
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

  const handleAddRecord = async () => {
    try {
      const tx = await contract.addRecord(
        Number(patientID),
        name,
        diagnosis,
        treatment
      );
      await tx.wait();
      alert("Record added successfully");
      setPatientID(""); setName(""); setDiagnosis(""); setTreatment("");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleGetRecords = async () => {
    try {
      const result = await contract.getRecords(Number(searchPatientID));
      setRecords(result);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };
  const [newProvider, setNewProvider] = useState("");

const handleAuthorizeProvider = async () => {
  try {
    const tx = await contract.authorizeProvider(newProvider);
    await tx.wait();
    alert(`Authorized ${newProvider} successfully!`);
    setNewProvider("");
  } catch (error) {
    alert("Error authorizing provider: " + error.message);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-lg space-y-6">
          <h1 className="text-3xl font-bold text-center text-cyan-400">🏥 HealthCare dApp</h1>

          <div className="text-sm text-gray-300">
            <p><span className="font-semibold">Connected:</span> {account}</p>
            <p><span className="font-semibold">Contract Owner:</span> {owner}</p>
          </div>

          {/* Add Record */}
          <div>
            <h2 className="text-xl font-semibold text-cyan-300 mb-2">➕ Add Patient Record</h2>
            <div className="grid gap-3">
              <input
                className="input"
                placeholder="Patient ID"
                value={patientID}
                onChange={e => setPatientID(e.target.value)}
              />
              <input
                className="input"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                className="input"
                placeholder="Diagnosis"
                value={diagnosis}
                onChange={e => setDiagnosis(e.target.value)}
              />
              <input
                className="input"
                placeholder="Treatment"
                value={treatment}
                onChange={e => setTreatment(e.target.value)}
              />
              <button
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-xl transition"
                onClick={handleAddRecord}
              >
                Add Record
              </button>
            </div>
          </div>

          {/* Get Records */}
          <div>
            <h2 className="text-xl font-semibold text-cyan-300 mb-2">🔍 Get Patient Records</h2>
            <div className="flex gap-2">
              <input
                className="input flex-1"
                placeholder="Patient ID"
                value={searchPatientID}
                onChange={e => setSearchPatientID(e.target.value)}
              />
              <button
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-xl"
                onClick={handleGetRecords}
              >
                Fetch
              </button>
            </div>

            {records.length > 0 && (
              <ul className="mt-4 space-y-3 text-sm">
                {records.map((rec, idx) => (
                  <li key={idx} className="border border-cyan-700 p-3 rounded-lg bg-white/5">
                    <p><strong>ID:</strong> {rec.recordID}</p>
                    <p><strong>Name:</strong> {rec.name}</p>
                    <p><strong>Diagnosis:</strong> {rec.diagnosis}</p>
                    <p><strong>Treatment:</strong> {rec.treatment}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(Number(rec.timestamp) * 1000).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Authorize Provider - Only visible to owner */}
{account === owner && (
  <div>
    <h2 className="text-xl font-semibold text-cyan-300 mb-2">✅ Authorize Provider</h2>
    <div className="flex gap-2">
      <input
        className="input flex-1"
        placeholder="Provider Address"
        value={newProvider}
        onChange={(e) => setNewProvider(e.target.value)}
      />
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-xl"
        onClick={handleAuthorizeProvider}
      >
        Authorize
      </button>
    </div>
  </div>
)}
        </div>
      </div>
    </div>
  );
}
