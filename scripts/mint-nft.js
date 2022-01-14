require('dotenv').config();
const API_URL = process.env.API_URL;
const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const web3 = createAlchemyWeb3(API_URL);

// Grabbing contract's ABI
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

// Printing the ABI in the console
console.log(JSON.stringify(contract.abi));

/* 
Command for printing the ABI in the console: 'node scripts/mint-nft.js'
*/

const contractAddress = "0xe8B00e6d6DE63a9c4d3d3b881d2199505eb03C5C";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);