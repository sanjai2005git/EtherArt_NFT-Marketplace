import { useEffect, useState } from "react";
import { ethers, Contract } from "ethers";
import ABI from "../utils/ABI.json";
import Address from "../utils/Address.json";
import Card from "../components/Card";

const Profile = () => {
  const abi = ABI.abi;
  const contractAddress = Address.contractAddress;

  const [result, setResult] = useState([]);
  const [youraddress, setYouraddress] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchNFTDetails = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setYouraddress(signer.address);

      const contract = new Contract(contractAddress, abi, signer);
      const res = await contract.getMyNFTs();
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNFTDetails();
  }, []);

  return (
    <div className="min-h-screen bg-black pt-32 px-6 md:px-16 text-white">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">
          Your NFTs
        </h1>
        <p className="text-neutral-400 mt-3 max-w-2xl">
          NFTs currently owned by your connected wallet.
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center mt-20">
          <div className="text-neutral-400">Loading your NFTs...</div>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && result.length === 0 && (
        <div className="max-w-4xl mx-auto bg-neutral-900 border border-neutral-800 rounded-xl p-6 text-neutral-300">
          <p>
            You don’t currently own any NFTs.
          </p>
          <p className="mt-2 text-neutral-400 text-sm">
            If you listed an NFT for sale, ownership is transferred to the
            marketplace contract until it is sold or relisted.
          </p>
        </div>
      )}

      {/* NFT GRID */}
      {!loading && result.length > 0 && (
        <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {result.map((i) => (
            <Card
              key={i[0].toString()}
              tokenId={i[0].toString()}
            />
          ))}
        </div>
      )}

      {/* OPENSEA LINK */}
      {youraddress && (
        <div className="max-w-7xl mx-auto mt-16 text-neutral-400">
          View your NFTs on{" "}
          <a
            href={`https://testnets.opensea.io/${youraddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            OpenSea
          </a>
        </div>
      )}
    </div>
  );
};

export default Profile;
