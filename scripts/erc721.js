const hre = require("hardhat");


async function main() {
    let testErc721Addr = "0x7c134C61e2649dbC9432F33689aA8Ae3D5E016F6";
    const MyCollectible = await hre.ethers.getContractFactory("MyCollectible");
    const myCollectible = await MyCollectible.attach(testErc721Addr);
    const owner = await hre.ethers.getSigner();
    console.log(await owner.getAddress())
    // await myCollectible.connect(owner).initialize();
    await myCollectible.connect(owner).mint(owner.getAddress(), 1);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
