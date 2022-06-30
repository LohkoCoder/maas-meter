// vm/evm.go 248
// contracts/params.go
// contracts/native/boot/boot.go

const Web3 = require("web3");		// recommand use require() instead of import here
const web3 = new Web3("http://127.0.0.1:8545");


const NativeGovernance = "0x4600691499997fCc224425ba5C93EebC57f3615b";

async function isExist() {
    let res = await web3.eth.getCode(NativeGovernance)
    console.log(res)
}

async function callNativeGovernanceFunc() {
    let data = web3.utils.keccak256("name()").slice(0,10)
    let res = await web3.eth.call({
        to: NativeGovernance, // contract address
        data: data
    })
    console.log(web3.utils.hexToString(res))
}

isExist()
callNativeGovernanceFunc()