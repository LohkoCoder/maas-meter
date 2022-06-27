# 操作步骤

# 1、根据测试节点端口修改

```
vi hardhat.config.ts
## 根据测试节点信息，修改以下信息中的 url 以及 chainId
module.exports = {
  solidity: "0.8.4",
  networks: {
    localhost: {
      url: 'http://localhost:8545',
      chainId: 10898, // 0x507 in hex,
      accounts: [privateKey]
    }
  }
};
```

# 2、 创建私钥文件

```
vi secrets.json
## 输入以下格式
{
    "privateKey": "your private key"
}
```

# 3、部署测试合约
运行以下指令
```
npx hardhat run ./scripts/deployErc721.js --network localhost
```
输出类似以下信息：
```
Storage deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```
记录下合约地址"0x5Fb..."

# 4、创建测试合约地址文件

```
vi contract.json
## 输入以下格式，将上一步部署的合约地址填入
{
    "contractAddr": "0x5Fb..."
}
```

# 5、大量发交易
```
npx hardhat run ./scripts/maas-script.js --network localhost
```
