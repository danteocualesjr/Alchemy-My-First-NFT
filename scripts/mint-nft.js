require('dotenv').config();

const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const web3 = createAlchemyWeb3(API_URL);

// Grabbing contract's ABI

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
const contractAddress = "0xe8B00e6d6DE63a9c4d3d3b881d2199505eb03C5C";
const nftContract= new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {   

    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); // Get latest nonce

    // The transaction    
    
    const tx = {

        'from': PUBLIC_KEY,
        'to': contractAddress,
        'nonce': nonce,
        'gas': 500000,
        'maxPriorityFeePerGas': 1999999987,
        'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
}

// Printing the ABI in the console
// console.log(JSON.stringify(contract.abi));

/* 
Command for printing the ABI in the console: 'node scripts/mint-nft.js'
*/

mintNFT("https://gateway.pinata.cloud/ipfs/QmTSu48mziHviSe33LcH2gtyKiVimheX2UZW94mXSrr1hr");

// Ran the command 'node scripts/mint-nft.js' to deploy and mint the NFT
// It should give an address