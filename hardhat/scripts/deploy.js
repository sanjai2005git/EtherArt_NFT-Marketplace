// scripts/deploy.js
async function main() {
  console.log("Deploying NFTMarketplace...");

  const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
  const marketplace = await NFTMarketplace.deploy();
  
  await marketplace.waitForDeployment();
  
  const address = await marketplace.getAddress();
  console.log("NFTMarketplace deployed to:", address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
