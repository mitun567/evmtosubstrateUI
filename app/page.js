// "use client";
// import { useState, useEffect } from "react";
// import Web3 from "web3";
// import { ApiPromise, WsProvider, web3Accounts, web3Enable } from "@polkadot/extension-dapp";

// const Bridge = () => {
//   const [polygonAddress, setPolygonAddress] = useState("");
//   const [substrateAddress, setSubstrateAddress] = useState("");
//   const [amount, setAmount] = useState("");
//   const [message, setMessage] = useState("");
//   const [web3, setWeb3] = useState(null);
//   const [polkadotApi, setPolkadotApi] = useState(null);
//   const [extraAmount, setExtraAmount] = useState(""); // New state for the extra amount
//   const [extraSignature, setExtraSignature] = useState(""); // New state for the extra signature


//  const agcTokenAddress = "0x2Ad2934d5BFB7912304754479Dd1f096D5C807Da"; // Replace with your AGC token address
//  const agcBridgeAddress = "0x243Ff8Af20030D71eafFCba0517dA63530056B96"; // Replace with your AGCBridge contract address

//  const agcTokenAbi = [
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "initialOwner",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "constructor"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "spender",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "allowance",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "needed",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "ERC20InsufficientAllowance",
// 		"type": "error"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "sender",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "balance",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "needed",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "ERC20InsufficientBalance",
// 		"type": "error"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "approver",
// 				"type": "address"
// 			}
// 		],
// 		"name": "ERC20InvalidApprover",
// 		"type": "error"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "receiver",
// 				"type": "address"
// 			}
// 		],
// 		"name": "ERC20InvalidReceiver",
// 		"type": "error"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "sender",
// 				"type": "address"
// 			}
// 		],
// 		"name": "ERC20InvalidSender",
// 		"type": "error"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "spender",
// 				"type": "address"
// 			}
// 		],
// 		"name": "ERC20InvalidSpender",
// 		"type": "error"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "owner",
// 				"type": "address"
// 			}
// 		],
// 		"name": "OwnableInvalidOwner",
// 		"type": "error"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "account",
// 				"type": "address"
// 			}
// 		],
// 		"name": "OwnableUnauthorizedAccount",
// 		"type": "error"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "owner",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "spender",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "value",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "Approval",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "account",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "amount",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "Locked",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "previousOwner",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "newOwner",
// 				"type": "address"
// 			}
// 		],
// 		"name": "OwnershipTransferred",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "from",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "to",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "value",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "Transfer",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "account",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "amount",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "Unlocked",
// 		"type": "event"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "owner",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "spender",
// 				"type": "address"
// 			}
// 		],
// 		"name": "allowance",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "spender",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "value",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "approve",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "account",
// 				"type": "address"
// 			}
// 		],
// 		"name": "balanceOf",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "decimals",
// 		"outputs": [
// 			{
// 				"internalType": "uint8",
// 				"name": "",
// 				"type": "uint8"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "account",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "amount",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "lock",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "name",
// 		"outputs": [
// 			{
// 				"internalType": "string",
// 				"name": "",
// 				"type": "string"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "owner",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "renounceOwnership",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "symbol",
// 		"outputs": [
// 			{
// 				"internalType": "string",
// 				"name": "",
// 				"type": "string"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "totalSupply",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "to",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "value",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "transfer",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "from",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "to",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "value",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "transferFrom",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "newOwner",
// 				"type": "address"
// 			}
// 		],
// 		"name": "transferOwnership",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "account",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "amount",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "unlock",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	}
// ];
//  const agcBridgeAbi = [
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "contract IERC20",
// 				"name": "_agcToken",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "initialOwner",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "_burnAddress",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "constructor"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "target",
// 				"type": "address"
// 			}
// 		],
// 		"name": "AddressEmptyCode",
// 		"type": "error"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "account",
// 				"type": "address"
// 			}
// 		],
// 		"name": "AddressInsufficientBalance",
// 		"type": "error"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "FailedInnerCall",
// 		"type": "error"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "owner",
// 				"type": "address"
// 			}
// 		],
// 		"name": "OwnableInvalidOwner",
// 		"type": "error"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "account",
// 				"type": "address"
// 			}
// 		],
// 		"name": "OwnableUnauthorizedAccount",
// 		"type": "error"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "token",
// 				"type": "address"
// 			}
// 		],
// 		"name": "SafeERC20FailedOperation",
// 		"type": "error"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "newBurnAddress",
// 				"type": "address"
// 			}
// 		],
// 		"name": "BurnAddressUpdated",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "previousOwner",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "newOwner",
// 				"type": "address"
// 			}
// 		],
// 		"name": "OwnershipTransferred",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"internalType": "address",
// 				"name": "account",
// 				"type": "address"
// 			}
// 		],
// 		"name": "Paused",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "amount",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "TokensBurned",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "account",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "amount",
// 				"type": "uint256"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "string",
// 				"name": "substrateAddress",
// 				"type": "string"
// 			}
// 		],
// 		"name": "TokensLocked",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"internalType": "address",
// 				"name": "account",
// 				"type": "address"
// 			}
// 		],
// 		"name": "Unpaused",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "amount",
// 				"type": "uint256"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "to",
// 				"type": "address"
// 			}
// 		],
// 		"name": "Withdrawal",
// 		"type": "event"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "agcToken",
// 		"outputs": [
// 			{
// 				"internalType": "contract IERC20",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "burnAddress",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "amount",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "substrateAddress",
// 				"type": "string"
// 			}
// 		],
// 		"name": "burningAGC",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "getOwner",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "account",
// 				"type": "address"
// 			}
// 		],
// 		"name": "getSubstrateAddress",
// 		"outputs": [
// 			{
// 				"internalType": "string",
// 				"name": "",
// 				"type": "string"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "owner",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "pause",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "paused",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "renounceOwnership",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "newOwner",
// 				"type": "address"
// 			}
// 		],
// 		"name": "transferOwnership",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "unpause",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"stateMutability": "payable",
// 		"type": "receive"
// 	}
// ];

// useEffect(() => {
//     if (window.ethereum) {
//       const web3Instance = new Web3(window.ethereum);
//       setWeb3(web3Instance);
//     } else {
//       setMessage("MetaMask not detected");
//     }

//     const connectPolkadot = async () => {
//       await web3Enable("my-bridge-app");
//       const accounts = await web3Accounts();
//       if (accounts.length > 0) {
//         setSubstrateAddress(accounts[0].address);
//       }

//       const wsProvider = new WsProvider("ws://127.0.0.1:9944");
//       const api = await ApiPromise.create({ provider: wsProvider });
//       setPolkadotApi(api);
//     };
//     connectPolkadot();
//   }, []);

//   // Separate functionality for signing with the extra amount
//   const signExtraMessage = async () => {
//     if (!web3) {
//       setMessage("MetaMask not connected");
//       return;
//     }

//     try {
//       const accounts = await web3.eth.requestAccounts();
//       const account = accounts[0];
      
//       if (!extraAmount) {
//         setMessage("Amount is required");
//         return;
//       }

//       const amountInWei = web3.utils.toWei(extraAmount, "ether"); // Convert to 18 decimal places
//       const message = `Transfer ${amountInWei} AGC from ${account} to Substrate`;

//       const signature = await web3.eth.personal.sign(message, account);
      
//       setExtraSignature(signature);
//       setMessage("Extra message signed successfully");
//     } catch (error) {
//       setMessage(`Error: ${error.message}`);
//     }
//   };

//   return (
//     <div>
//       <h1>Token Bridge</h1>
      
//       {/* Removed the previous Sign Message button */}
      
//       {/* Additional Input Field 200px Below */}
//       <div style={{ marginTop: '200px' }}>
//         <input
//           type="number"
//           placeholder="Extra Amount"
//           value={extraAmount}
//           onChange={(e) => setExtraAmount(e.target.value)}
//           style={{
//             outlineColor: '#f39c12', 
//             outlineStyle: 'solid',
//             outlineWidth: '2px',
//             marginBottom: '10px', 
//             padding: '10px', 
//             borderRadius: '4px' 
//           }}
//         />
//         <button 
//           style={{ 
//             backgroundColor: '#f39c12', 
//             color: 'white', 
//             border: 'none', 
//             padding: '10px 20px', 
//             textAlign: 'center', 
//             textDecoration: 'none', 
//             display: 'inline-block', 
//             fontSize: '16px', 
//             margin: '4px 2px', 
//             cursor: 'pointer' 
//           }} 
//           onClick={signExtraMessage}
//         >
//           Sign Extra Message
//         </button>
//       </div>
//       {extraSignature && (
//         <div>
//           <p>Extra Signature:</p>
//           <textarea 
//             value={extraSignature} 
//             readOnly 
//             rows="4" 
//             cols="50" 
//             style={{ 
//               marginBottom: '10px', 
//               padding: '10px', 
//               borderRadius: '4px' 
//             }}
//           />
//         </div>
//       )}
//       <p>{message}</p>
//     </div>
//   );
// };

// export default Bridge;


// "use client";
// import { useState, useEffect } from "react";
// import Web3 from "web3";

// const Bridge = () => {
//   const [amount, setAmount] = useState("");
//   const [message, setMessage] = useState("");
//   const [signature, setSignature] = useState("");

//   useEffect(() => {
//     if (window.ethereum) {
//       const web3Instance = new Web3(window.ethereum);
//       window.web3 = web3Instance;
//     } else {
//       setMessage("MetaMask not detected");
//     }
//   }, []);

//   const signMessage = async () => {
//     try {
//       const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//       const account = accounts[0]; // Select the first account

//       if (!amount) {
//         setMessage("Please enter an amount.");
//         return;
//       }

//       const amountInWei = window.web3.utils.toWei(amount, "ether"); // Convert amount to Wei
//       const messageToSign = `Transfer ${amountInWei} AGC from ${account} to Substrate`;

//       console.log("Message to sign:", messageToSign);

//       // Sign the message using personal_sign
//       const signature = await window.web3.eth.personal.sign(messageToSign, account, "");

//       setSignature(signature);
//       setMessage("Message signed successfully");
//     } catch (error) {
//       console.error("Error during signing:", error);
//       setMessage(`Error: ${error.message}`);
//     }
//   };

//   return (
//     <div>
//       <h1>Token Bridge</h1>

//       <div style={{ marginTop: '50px' }}>
//         <input
//           type="text"
//           placeholder="Enter Amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           style={{
//             outlineColor: '#f39c12', 
//             outlineStyle: 'solid',
//             outlineWidth: '2px',
//             marginBottom: '10px', 
//             padding: '10px', 
//             borderRadius: '4px' 
//           }}
//         />
//         <button 
//           style={{ 
//             backgroundColor: '#f39c12', 
//             color: 'white', 
//             border: 'none', 
//             padding: '10px 20px', 
//             textAlign: 'center', 
//             textDecoration: 'none', 
//             display: 'inline-block', 
//             fontSize: '16px', 
//             margin: '4px 2px', 
//             cursor: 'pointer' 
//           }} 
//           onClick={signMessage}
//         >
//           Sign Message
//         </button>
//       </div>

//       {signature && (
//         <div style={{ marginTop: '20px' }}>
//           <h4>Signature:</h4>
//           <p>{signature}</p>
//         </div>
//       )}

//       <p>{message}</p>
//     </div>
//   );
// };

// export default Bridge;

// "use client";
// import { useState, useEffect } from "react";
// import Web3 from "web3";

// const Bridge = () => {
//   const [amount, setAmount] = useState("");
//   const [message, setMessage] = useState("");
//   const [signature, setSignature] = useState("");

//   useEffect(() => {
//     if (window.ethereum) {
//       const web3Instance = new Web3(window.ethereum);
//       window.web3 = web3Instance;
//     } else {
//       setMessage("MetaMask not detected");
//     }
//   }, []);

//   const signMessage = async () => {
//     try {
//       const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//       const account = accounts[0]; // Select the first account

//       if (!amount) {
//         setMessage("Please enter an amount.");
//         return;
//       }

//       const amountInWei = window.web3.utils.toWei(amount, "ether"); // Convert amount to Wei
//       const messageToSign = `Transfer ${amountInWei} AGC from ${account} to Substrate`;

//       console.log("Message to sign:", messageToSign);

//       // Sign the message directly using personal_sign
//       const signature = await window.web3.eth.personal.sign(messageToSign, account, "");
//       console.log(signature);
//       setSignature(signature);
//       setMessage("Message signed successfully");
//     } catch (error) {
//       console.error("Error during signing:", error);
//       setMessage(`Error: ${error.message}`);
//     }
//   };

//   return (
//     <div>
//       <h1>Token Signing</h1>

//       <div style={{ marginTop: '50px' }}>
//         <input
//           type="text"
//           placeholder="Enter Amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           style={{
//             outlineColor: '#f39c12', 
//             outlineStyle: 'solid',
//             outlineWidth: '2px',
//             marginBottom: '10px', 
//             padding: '10px', 
//             borderRadius: '4px' 
//           }}
//         />
//         <button 
//           style={{ 
//             backgroundColor: '#f39c12', 
//             color: 'white', 
//             border: 'none', 
//             padding: '10px 20px', 
//             textAlign: 'center', 
//             textDecoration: 'none', 
//             display: 'inline-block', 
//             fontSize: '16px', 
//             margin: '4px 2px', 
//             cursor: 'pointer' 
//           }} 
//           onClick={signMessage}
//         >
//           Sign Message
//         </button>
//       </div>

//       {signature && (
//         <div style={{ marginTop: '20px' }}>
//           <h4>Signature:</h4>
//           <p>{signature}</p>
//         </div>
//       )}

//       <p>{message}</p>
//     </div>
//   );
// };

// export default Bridge;
// "use client";
// import { useState, useEffect } from "react";
// import Web3 from "web3";

// const Bridge = () => {
//   const [amount, setAmount] = useState("");
//   const [message, setMessage] = useState("");
//   const [signature, setSignature] = useState("");

//   useEffect(() => {
//     if (window.ethereum) {
//       const web3Instance = new Web3(window.ethereum);
//       window.web3 = web3Instance;
//     } else {
//       setMessage("MetaMask not detected");
//     }
//   }, []);

//   const signMessage = async () => {
//     try {
//       const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//       const account = accounts[0]; // Select the first account

//       if (!amount) {
//         setMessage("Please enter an amount.");
//         return;
//       }

//       const amountInWei = window.web3.utils.toWei(amount, "ether"); // Convert amount to Wei
//       const messageToSign = `Transfer ${amountInWei} AGC from ${account} to Substrate`;

//       console.log("Message to sign:", messageToSign);

//       // Hash the message manually with the prefix to compare
//       const prefix = `\x19Ethereum Signed Message:\n${messageToSign.length}`;
//       const prefixedMessage = prefix + messageToSign;
//       const messageHash = window.web3.utils.sha3(prefixedMessage);
      
//       console.log("Prefixed Message:", prefixedMessage);
//       console.log("Message Hash:", messageHash);

//       // Sign the message directly using personal_sign
//       const signature = await window.web3.eth.personal.sign(messageToSign, account, "");
//       console.log("Signature:", signature);
//       setSignature(signature);
//       setMessage("Message signed successfully");
//     } catch (error) {
//       console.error("Error during signing:", error);
//       setMessage(`Error: ${error.message}`);
//     }
//   };

//   return (
//     <div>
//       <h1>Token Signing</h1>

//       <div style={{ marginTop: '50px' }}>
//         <input
//           type="text"
//           placeholder="Enter Amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           style={{
//             outlineColor: '#f39c12', 
//             outlineStyle: 'solid',
//             outlineWidth: '2px',
//             marginBottom: '10px', 
//             padding: '10px', 
//             borderRadius: '4px' 
//           }}
//         />
//         <button 
//           style={{ 
//             backgroundColor: '#f39c12', 
//             color: 'white', 
//             border: 'none', 
//             padding: '10px 20px', 
//             textAlign: 'center', 
//             textDecoration: 'none', 
//             display: 'inline-block', 
//             fontSize: '16px', 
//             margin: '4px 2px', 
//             cursor: 'pointer' 
//           }} 
//           onClick={signMessage}
//         >
//           Sign Message
//         </button>
//       </div>

//       {signature && (
//         <div style={{ marginTop: '20px' }}>
//           <h4>Signature:</h4>
//           <p>{signature}</p>
//         </div>
//       )}

//       <p>{message}</p>
//     </div>
//   );
// };

// export default Bridge;
"use client";
import { useState, useEffect } from "react";
import Web3 from "web3";
import { ethers } from "ethers";

const Bridge = () => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const [recoveredKey, setRecoveredKey] = useState("");
  const [derivedAddress, setDerivedAddress] = useState("");

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      window.web3 = web3Instance;
    } else {
      setMessage("MetaMask not detected");
    }
  }, []);

  const signMessage = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0]; // Select the first account

      if (!amount) {
        setMessage("Please enter an amount.");
        return;
      }

      const amountInWei = window.web3.utils.toWei(amount, "ether"); // Convert amount to Wei
      const messageToSign = `Transfer ${amountInWei} AGC from ${account} to Substrate`;

      console.log("Message to sign:", messageToSign);

      // Hash the message using ethers.js
      const messageHash = ethers.utils.hashMessage(messageToSign);

      console.log("Message Hash:", messageHash);

      // Sign the message directly using personal_sign
      const signature = await window.web3.eth.personal.sign(messageToSign, account, "");
      console.log("Signature:", signature);
      setSignature(signature);
      setMessage("Message signed successfully");

      // Recover the public key and derive the address using ethers.js
      const recoveredPublicKey = ethers.utils.recoverPublicKey(messageHash, signature);
      console.log("Recovered Public Key:", recoveredPublicKey);
      setRecoveredKey(recoveredPublicKey);

      // Derive the Ethereum address from the recovered public key
      const derivedAddress = ethers.utils.computeAddress(recoveredPublicKey);
      console.log("Derived Ethereum Address:", derivedAddress);
      setDerivedAddress(derivedAddress);

    } catch (error) {
      console.error("Error during signing:", error);
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Token Signing</h1>

      <div style={{ marginTop: '50px' }}>
        <input
          type="text"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            outlineColor: '#f39c12', 
            outlineStyle: 'solid',
            outlineWidth: '2px',
            marginBottom: '10px', 
            padding: '10px', 
            borderRadius: '4px' 
          }}
        />
        <button 
          style={{ 
            backgroundColor: '#f39c12', 
            color: 'white', 
            border: 'none', 
            padding: '10px 20px', 
            textAlign: 'center', 
            textDecoration: 'none', 
            display: 'inline-block', 
            fontSize: '16px', 
            margin: '4px 2px', 
            cursor: 'pointer' 
          }} 
          onClick={signMessage}
        >
          Sign Message
        </button>
      </div>

      {signature && (
        <div style={{ marginTop: '20px' }}>
          <h4>Signature:</h4>
          <p>{signature}</p>
        </div>
      )}

      {recoveredKey && (
        <div style={{ marginTop: '20px' }}>
          <h4>Recovered Public Key:</h4>
          <p>{recoveredKey}</p>
        </div>
      )}

      {derivedAddress && (
        <div style={{ marginTop: '20px' }}>
          <h4>Derived Ethereum Address:</h4>
          <p>{derivedAddress}</p>
        </div>
      )}

      <p>{message}</p>
    </div>
  );
};

export default Bridge;
// "use client"
// import React, { useState, useEffect } from 'react';
// import { ethers } from 'ethers';

// const Bridge = () => {
//     const [amount, setAmount] = useState("");
//     const [signature, setSignature] = useState("");
//     const [message, setMessage] = useState("");
//     const [userAddress, setUserAddress] = useState("");

//     useEffect(() => {
//         if (window.ethereum) {
//             window.ethereum.request({ method: 'eth_requestAccounts' })
//                 .then(accounts => {
//                     setUserAddress(accounts[0]);
//                 })
//                 .catch((err) => console.error(err));
//         }
//     }, []);

//     const signMessage = async () => {
//         if (!amount || !userAddress) {
//             setMessage("Please enter a valid amount and ensure you're connected to an Ethereum wallet.");
//             return;
//         }

//         const amountInWei = ethers.utils.parseUnits(amount, "ether"); // Convert amount to Wei
//         const messageToSign = `Transfer ${amountInWei.toString()} AGC from ${userAddress} to Substrate`;

//         try {
//             const provider = new ethers.providers.Web3Provider(window.ethereum);
//             const signer = provider.getSigner();
//             const signature = await signer.signMessage(messageToSign);

//             console.log("Signature:", signature);

//             setSignature(signature);
//             setMessage("Message signed successfully!");
//         } catch (error) {
//             console.error("Error signing message:", error);
//             setMessage("Error signing message.");
//         }
//     };

//     const sendToSubstrate = async () => {
//         if (!signature || !amount) {
//             setMessage("Please sign the message first.");
//             return;
//         }

//         try {
//             // Assuming you have an API endpoint to send the data to your Substrate chain
//             const response = await fetch('/api/send-to-substrate', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     evmAddress: userAddress,
//                     amount: ethers.utils.parseUnits(amount, "ether").toString(),
//                     signature: signature,
//                 }),
//             });

//             const result = await response.json();
//             setMessage(result.message || "Transaction submitted to Substrate chain.");
//         } catch (error) {
//             console.error("Error sending to Substrate:", error);
//             setMessage("Error sending to Substrate.");
//         }
//     };

//     return (
//         <div>
//             <h1>Bridge AGC from Ethereum to Substrate</h1>
//             <div style={{ marginTop: '50px' }}>
//                 <input
//                     type="text"
//                     placeholder="Enter Amount"
//                     value={amount}
//                     onChange={(e) => setAmount(e.target.value)}
//                     style={{
//                         outlineColor: '#f39c12', 
//                         outlineStyle: 'solid',
//                         outlineWidth: '2px',
//                         marginBottom: '10px', 
//                         padding: '10px', 
//                         borderRadius: '4px' 
//                     }}
//                 />
//                 <button 
//                     style={{ 
//                         backgroundColor: '#f39c12', 
//                         color: 'white', 
//                         border: 'none', 
//                         padding: '10px 20px', 
//                         textAlign: 'center', 
//                         textDecoration: 'none', 
//                         display: 'inline-block', 
//                         fontSize: '16px', 
//                         margin: '4px 2px', 
//                         cursor: 'pointer' 
//                     }} 
//                     onClick={signMessage}
//                 >
//                     Sign Message
//                 </button>
//             </div>

//             {signature && (
//                 <div style={{ marginTop: '20px' }}>
//                     <h4>Signature:</h4>
//                     <p>{signature}</p>
//                 </div>
//             )}

//             <button 
//                 style={{ 
//                     backgroundColor: '#27ae60', 
//                     color: 'white', 
//                     border: 'none', 
//                     padding: '10px 20px', 
//                     textAlign: 'center', 
//                     textDecoration: 'none', 
//                     display: 'inline-block', 
//                     fontSize: '16px', 
//                     margin: '4px 2px', 
//                     cursor: 'pointer' 
//                 }} 
//                 onClick={sendToSubstrate}
//             >
//                 Send to Substrate
//             </button>

//             <p>{message}</p>
//         </div>
//     );
// };

// export default Bridge;
