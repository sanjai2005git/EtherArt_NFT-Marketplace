const hre = require("hardhat");

async function main() {
  const CONTRACT = process.env.CONTRACT_ADDRESS || "0xFF15d97254Fff70D9c46372d7584672F41f7C971";
  const TOKEN_IDS = [10, 11];

  const abiJson = require("../../src/utils/ABI.json");
  const abi = abiJson.abi || abiJson;

  const [signer] = await hre.ethers.getSigners();
  console.log("Using signer:", signer.address);

  const contract = new hre.ethers.Contract(CONTRACT, abi, signer);

  for (const id of TOKEN_IDS) {
    console.log(`Processing tokenId=${id}...`);
    const listing = await contract.getListedTokenForId(id);
    const price = listing.price;
    console.log(`- current price: ${price.toString()}`);
    if (!listing.currentlyListed) {
      console.log(`- token ${id} is not currently listed; skipping.`);
      continue;
    }

    console.log(`- sending executeSale(${id}) with value ${price.toString()}...`);
    const tx = await contract.executeSale(id, { value: price });
    console.log(`- tx sent: ${tx.hash}`);
    await tx.wait();
    console.log(`- token ${id} bought back / delisted.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
