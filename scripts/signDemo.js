const hre = require("hardhat");
const Web3 = require("web3");		// recommand use require() instead of import here
const web3 = new Web3();


async function main() {

    let abi = "[{\"name\": \"BlockAccount\", \"type\": \"event\", \"inputs\": [], \"anonymous\": false}]"
    let digest = web3.utils.keccak256(abi)
    // Using hardhat to sign a message
    const [account] = await hre.ethers.getSigners();
    const signature = await account.signMessage(ethers.utils.arrayify(digest));
    await uploadAbi("0x8104b0f3B6Ca75b54C987c6875d80a3C7d9dBC4e", abi, signature)
}

async function uploadAbi(contractAddress, abi, signature) {
    const http = require('http')
    const data = JSON.stringify({
        signature: signature,
        address: contractAddress,
        abi: abi
    })

    const options = {
        hostname: '121.4.146.202',
        port: 8702,
        path: '/explorer/contract/uploadAbi',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
        }

    }


    const req = http.request(options, res => {
        console.log(`状态码: ${res.statusCode}`)

        res.on('data', d => {
            process.stdout.write(d)
        })
    })

    req.on('error', error => {
        console.error(error)
    })
    req.write(data);

    req.end()

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
