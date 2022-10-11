const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  // http://127.0.0.1:8545
  // connect to Ganache network using ethers.js
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );
  const wallet = new ethers.Wallet(
    "0xfb07234f1c635d54be7415286d3595cf5ab16054b2c52931a8c059a6f52c23d5",
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
  console.log(contract);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
