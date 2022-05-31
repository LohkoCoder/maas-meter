const hre = require("hardhat");

async function testInvokeSpeed() {
    // We get the deployed contract
    const contract = await hre.ethers.getContractAt("Storage", "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");
    const [gov, user1, user2, rewardAdder] = await hre.ethers.getSigners();
    
    var txlist = [];

    for (var i = 0; i < 1000; i++) {
        var startTime = new Date();
        var tx = await contract.store(i);
        tx.sendTime = startTime.getTime();
        console.log("[" + new Date() + "]" + tx.hash);
        txlist.push(tx);
    }

    for (var i = 0; i < txlist.length; i++) {
        var tx = txlist[i];
        var receipt = await tx.wait();
        tx.endTime = (await contract.provider.getBlock(receipt.blockNumber)).timestamp * 1000;
        console.log("[" + new Date() + "] tx hash: " + tx.hash + "  spend time: " + (tx.endTime - tx.sendTime));
    }
}

async function main() {
    await testInvokeSpeed()
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
