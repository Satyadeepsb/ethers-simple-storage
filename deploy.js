const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  // Windows - http://127.0.0.1:7545
  // WSL - http://127.0.0.1:8545
  // connect to Ganache network using ethers.js
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );
  // Windows - a833a535f9c18c210f2366f519d5ff2ab80bf8fdf72b634d828da084fb78953a
  // WSL - 0x30162e16acb3a9339a749f9c0b9877a350935bf7edbaeac5146631fc069d7e29
  const wallet = new ethers.Wallet(
    "0x30162e16acb3a9339a749f9c0b9877a350935bf7edbaeac5146631fc069d7e29",
    provider
  );
  const abi = fs.readFileSync("./SimpleStoreage_sol_SimpleStorage.abi", "utf8");

  const binary = fs.readFileSync(
    "./SimpleStoreage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying....Please wait...");
  const contract = await contractFactory.deploy(); // STOP here! Wait for the contract to be deployed
  // const contract = await contractFactory.deploy({gasPrice : 1000000000, gasLimit: 10000000000});
  // can pass args to deploye as gasPrice, gasLimit
  // Transaction Receipts - wait for block conformation (1)
  const transactionReceipt = await contract.deployTransaction.wait(1);
  console.log("Here is the deployment transaction (transaction response)");
  console.log(contract.deployTransaction);
  console.log("Here is the transaction receipt");
  // when you wait for block conformation then you get the transactionReceipt
  console.log(transactionReceipt);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
