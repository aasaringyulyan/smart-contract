const Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/9535f9d03875445298291af53640695d"));
const address = "0x0ca510c42034d980a1128e1cb5ba4506fa90916e";
const ABI = "[\n" +
    "\t{\n" +
    "\t\t\"inputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"initialSupply\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"stateMutability\": \"nonpayable\",\n" +
    "\t\t\"type\": \"constructor\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"anonymous\": false,\n" +
    "\t\t\"inputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"indexed\": true,\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"owner\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"indexed\": true,\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"spender\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"indexed\": false,\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"value\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"name\": \"Approval\",\n" +
    "\t\t\"type\": \"event\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"anonymous\": false,\n" +
    "\t\t\"inputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"indexed\": true,\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"from\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"indexed\": true,\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"to\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"indexed\": false,\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"value\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"name\": \"Transfer\",\n" +
    "\t\t\"type\": \"event\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"inputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"owner\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"spender\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"name\": \"allowance\",\n" +
    "\t\t\"outputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"stateMutability\": \"view\",\n" +
    "\t\t\"type\": \"function\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"inputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"spender\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"amount\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"name\": \"approve\",\n" +
    "\t\t\"outputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"bool\",\n" +
    "\t\t\t\t\"name\": \"\",\n" +
    "\t\t\t\t\"type\": \"bool\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"stateMutability\": \"nonpayable\",\n" +
    "\t\t\"type\": \"function\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"inputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"account\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"name\": \"balanceOf\",\n" +
    "\t\t\"outputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"stateMutability\": \"view\",\n" +
    "\t\t\"type\": \"function\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"inputs\": [],\n" +
    "\t\t\"name\": \"decimals\",\n" +
    "\t\t\"outputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"uint8\",\n" +
    "\t\t\t\t\"name\": \"\",\n" +
    "\t\t\t\t\"type\": \"uint8\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"stateMutability\": \"view\",\n" +
    "\t\t\"type\": \"function\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"inputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"spender\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"subtractedValue\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"name\": \"decreaseAllowance\",\n" +
    "\t\t\"outputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"bool\",\n" +
    "\t\t\t\t\"name\": \"\",\n" +
    "\t\t\t\t\"type\": \"bool\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"stateMutability\": \"nonpayable\",\n" +
    "\t\t\"type\": \"function\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"inputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"spender\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"addedValue\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"name\": \"increaseAllowance\",\n" +
    "\t\t\"outputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"bool\",\n" +
    "\t\t\t\t\"name\": \"\",\n" +
    "\t\t\t\t\"type\": \"bool\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"stateMutability\": \"nonpayable\",\n" +
    "\t\t\"type\": \"function\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"inputs\": [],\n" +
    "\t\t\"name\": \"name\",\n" +
    "\t\t\"outputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"string\",\n" +
    "\t\t\t\t\"name\": \"\",\n" +
    "\t\t\t\t\"type\": \"string\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"stateMutability\": \"view\",\n" +
    "\t\t\"type\": \"function\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"inputs\": [],\n" +
    "\t\t\"name\": \"symbol\",\n" +
    "\t\t\"outputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"string\",\n" +
    "\t\t\t\t\"name\": \"\",\n" +
    "\t\t\t\t\"type\": \"string\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"stateMutability\": \"view\",\n" +
    "\t\t\"type\": \"function\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"inputs\": [],\n" +
    "\t\t\"name\": \"totalSupply\",\n" +
    "\t\t\"outputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"stateMutability\": \"view\",\n" +
    "\t\t\"type\": \"function\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"inputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"to\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"amount\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"name\": \"transfer\",\n" +
    "\t\t\"outputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"bool\",\n" +
    "\t\t\t\t\"name\": \"\",\n" +
    "\t\t\t\t\"type\": \"bool\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"stateMutability\": \"nonpayable\",\n" +
    "\t\t\"type\": \"function\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"inputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"from\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"to\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"amount\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"name\": \"transferFrom\",\n" +
    "\t\t\"outputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"bool\",\n" +
    "\t\t\t\t\"name\": \"\",\n" +
    "\t\t\t\t\"type\": \"bool\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"stateMutability\": \"nonpayable\",\n" +
    "\t\t\"type\": \"function\"\n" +
    "\t}\n" +
    "]";
web3.eth.getBalance // проверяем
const myContract = new web3.eth.Contract(ABI, address)
myContract.getPastEvents(
    "AllEvents",
    { fromBlock: 0, toBlock: "latest" },
    function (error, events) {
        console.log(events)
        console.log(error)
    }
);
