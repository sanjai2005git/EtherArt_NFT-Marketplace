import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ABI from "../utils/ABI.json";
import { ethers, Contract } from "ethers";
import Address from "../utils/Address.json";
import Button from "./Button";

const NFT = () => {
  const tokenId = useParams().id;

  const abi = ABI.abi;
  const contractAddress = Address.contractAddress;

  const [nftimg, setnftimg] = useState(null);
  const [owner, setOwner] = useState(null);
  const [seller, setSeller] = useState(null);
  const [reSellPrice, setReSellPrice] = useState(null);
  const [price, setPrice] = useState(null);
  const [name, setName] = useState(null);
  const [desc, setDesc] = useState(null);
  const [message, setMessage] = useState(null);
  const [result, setResult] = useState(null);
  const [relistMessage, setRelistMessage] = useState(null);
  const [displayPrice, setDisplayPrice] = useState(0);
  const [address, setAddress] = useState(null);
  const [pricePop, setPricePop] = useState(null);
  const [isRelisting, setIsRelisting] = useState(false);

  const navigate = useNavigate();
  let provider;

  const getNFTImage = async () => {
    provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    setAddress(signer.address);
    const contract = new Contract(contractAddress, abi, signer);
    const res = await contract.tokenURI(tokenId);

    const fetchedData = await fetch(res);
    const jsonData = await fetchedData.json();

    jsonData.image ? setnftimg(jsonData.image) : setnftimg(jsonData.img_url);

    setOwner(await contract.ownerOf(tokenId));
    const details = await contract.getListedTokenForId(tokenId);

    setName(jsonData.name);
    setResult(details);
    setSeller(details.seller);
    const wei = details.price;
    setPrice(wei);
    setDesc(jsonData.description);

    try {
      let priceETH = ethers.formatEther(wei.toString());
      setDisplayPrice(priceETH);
    } catch (err) {
      console.log(err);
    }
  };

const handleRelistNFT = async () => {
  if (reSellPrice == null || reSellPrice <= 0 || isRelisting) return;

  provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  try {
    if (owner == signer.address) {
      setIsRelisting(true);
      setRelistMessage("Transaction in progress, please wait...");

      let valueInWei = ethers.parseEther(reSellPrice.toString());
      const contract = new Contract(contractAddress, abi, signer);

      const res = await contract.relistToken(tokenId, valueInWei, {
        value: ethers.parseEther("0.01"),
      });

      setRelistMessage("Transaction submitted...");
      await res.wait(2);

      setRelistMessage("NFT listed successfully");
      navigate("/profile");
    }
  } catch (e) {
    console.log(e);
    setRelistMessage("Transaction failed");
  } finally {
    setIsRelisting(false);
  }
};


  const handleBuyNFT = async () => {
    try {
      setMessage("Processing...");

      provider = new ethers.BrowserProvider(window.ethereum);

      const signer = await provider.getSigner();

      const contract = new Contract(contractAddress, abi, signer);

      const balance = await provider.getBalance(signer.address);

      if (balance < price) {
        setMessage("Insufficient funds");

        setTimeout(() => {
          setMessage(null);
        }, 3000);

        return;
      }

      const tx = await contract.executeSale(tokenId, {
        value: price,
      });

      setMessage("Transaction submitted...");

      await tx.wait(2);

      setMessage("Listed");

      setTimeout(()=>{
        navigate("/profile");
      }, 2000);

      setOwner(await contract.ownerOf(tokenId));

      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      let errorMessage = "Transaction failed";

      if (err.code === "INSUFFICIENT_FUNDS") {
        errorMessage = "Insufficient funds to complete the purchase";
      } else if (err.code === "ACTION_REJECTED") {
        errorMessage = "Transaction rejected by user";
      } else if (err.message.includes("gas")) {
        errorMessage = "Insufficient gas funds";
      }

      setMessage(errorMessage);

      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  useEffect(() => {
    getNFTImage();
  }, []);

  // const handleAddFav = (tokenId) => {
  //   localStorage.setItem("tokenId", tokenId);
  // };

  return (
    <div className="px-16 py-20 bg-black mt-16">
      <section className="antialiased dark:bg-black">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-20">
            {/* IMAGE */}
            <div className="max-w-md mx-auto lg:max-w-lg bg-neutral-900 rounded-2xl p-6 border border-neutral-800">
              <img
                className="w-full rounded-xl object-cover"
                src={nftimg}
                alt="NFT"
              />
            </div>

            {/* INFO */}
            <div className="mt-8 lg:mt-0 flex flex-col gap-6">
              {/* TITLE + PRICE */}
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">
                  {name}
                </h1>
                <p className="mt-2 text-2xl font-semibold text-green-400">
                  {displayPrice} ETH
                </p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-4 pt-4">
                {owner === address ? (
                  <div className="relative w-1/2">
                    <Button
                      text="List for Sale"
                      className="w-full py-4 text-lg"
                      onClick={() => setPricePop(true)}
                    />

                    {pricePop && (
                      <div className="absolute top-[-180px] left-0 z-50 w-full bg-neutral-900 border border-neutral-700 rounded-xl p-4">
                        <label className="text-sm text-neutral-400">
                          Enter price (ETH)
                        </label>
                        <input
                          type="number"
                          className="w-full mt-2 rounded-md bg-black border border-neutral-700 p-3 text-white"
                          onChange={(e) => setReSellPrice(e.target.value)}
                        />
                        <div className="flex gap-2 mt-4">
                          <Button
                            className="w-full"
                            text={isRelisting ? "Please wait..." : "Confirm"}
                            onClick={handleRelistNFT}
                            disabled={isRelisting}
                          />

                          <button
                            className="w-full bg-neutral-800 rounded-lg text-white"
                            onClick={() => setPricePop(false)}
                          >
                            {relistMessage && (
                              <p className="mt-2 text-sm text-blue-400">
                                {relistMessage}
                              </p>
                            )}
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <button className="w-1/2 bg-neutral-800 text-white py-4 rounded-lg cursor-not-allowed">
                    List for Sale
                  </button>
                )}

                {result?.currentlyListed ? (
                  <Button
                    text="Buy NFT"
                    className="w-1/2 py-4 text-lg"
                    onClick={handleBuyNFT}
                  />
                ) : (
                  <button className="w-1/2 bg-neutral-800 text-white py-4 rounded-lg cursor-not-allowed">
                    Buy NFT
                  </button>
                )}
              </div>

              {/* STATUS MESSAGE */}
              {message && (
                <div
                  className={`mt-4 p-4 rounded-lg text-sm ${
                    message.includes("failed") ||
                    message.includes("Insufficient")
                      ? "bg-red-900/20 text-red-400"
                      : message.includes("successful")
                      ? "bg-green-900/20 text-green-400"
                      : "bg-blue-900/20 text-blue-400"
                  }`}
                >
                  {message}
                </div>
              )}

              <hr className="border-neutral-800 my-6" />

              {/* DESCRIPTION */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Description
                </h3>
                <p className="text-neutral-400 leading-relaxed">{desc}</p>
              </div>

              {/* DETAILS */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
                  <p className="text-neutral-500">Token ID</p>
                  <p className="text-white font-medium">{tokenId}</p>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
                  <p className="text-neutral-500">Network</p>
                  <p className="text-white font-medium">Ethereum</p>
                </div>
              </div>

              {/* OWNERSHIP */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Ownership
                </h3>
                <p className="text-neutral-400 break-all">
                  <span className="text-neutral-500">Owner:</span>{" "}
                  {owner == contractAddress ? "Held by NFTorium" : owner}
                </p>
                <p className="text-neutral-400 break-all mt-2">
                  <span className="text-neutral-500">Seller:</span> {seller}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NFT;
