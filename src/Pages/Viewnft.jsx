import { useEffect, useState } from "react";
import CardContainer from "../components/CardContainer";
import Address from "../utils/Address.json";
import ABI from "../utils/ABI.json";
import { Contract } from "ethers";
import { Link } from "react-router-dom";
import { useWallet } from "../utils/WalletProvider";

const Viewnft = () => {
  const abi = ABI.abi;
  const contractAddress = Address.contractAddress;

  const [result, setResult] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [length, setLength] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { signer } = useWallet();

  async function getAllNFTs() {
    try {
      const contract = new Contract(contractAddress, abi, signer);
      const res = await contract.getAllNFTs();

      setLength(res.length);
      setResult(res);
      setFiltered(res);
    } catch (err) {
      setError("Please switch to the Sepolia testnet to view NFTs.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllNFTs();
  }, []);

  const handleSearch = () => {
    if (!search) {
      setFiltered(result);
      return;
    }
    setFiltered(result.filter((r) => r[0].toString() === search));
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 px-6 md:px-12">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Explore NFTs</h1>
        <p className="text-neutral-400">
          Browse all minted NFTs on the marketplace
        </p>
      </div>

      {/* TOOLBAR */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-col lg:flex-row gap-4 items-center justify-between">
        {/* STATS */}
        <div className="flex gap-4 w-full lg:w-auto">
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg px-6 py-4">
            <p className="text-neutral-400 text-sm">Total Minted</p>
            <p className="text-xl font-semibold">{length}</p>
          </div>

          <Link
            to={`/view/${length}`}
            className="bg-neutral-900 border border-neutral-800 rounded-lg px-6 py-4 flex items-center hover:border-neutral-600 transition"
          >
            Recently Minted
          </Link>
        </div>

        {/* SEARCH */}
        <div className="flex w-full lg:w-[420px] gap-2">
          <input
            type="number"
            placeholder="Search by Token ID"
            className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="px-5 py-3 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition"
          >
            Search
          </button>
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="max-w-4xl mx-auto mt-10 bg-neutral-900 border border-neutral-800 rounded-xl p-6 text-neutral-300">
          {error}
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-[380px] bg-neutral-900 rounded-xl animate-pulse"
            />
          ))}
        </div>
      )}

      {/* EMPTY */}
      {!loading && !error && filtered.length === 0 && (
        <div className="mt-20 text-center text-neutral-400">
          <p className="text-lg">No NFTs found</p>
          <p className="text-sm mt-2">Try searching with a valid Token ID</p>
        </div>
      )}

      {/* NFT GRID */}
      {!loading && !error && filtered.length > 0 && (
        <div className="mt-12">
          <CardContainer nfts={filtered} />
        </div>
      )}
    </div>
  );
};

export default Viewnft;
