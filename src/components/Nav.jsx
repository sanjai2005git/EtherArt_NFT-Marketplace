import { useWallet } from "../utils/WalletProvider";
import logo from "../assets/NFTorium.png";

const Nav = () => {
  const { connectWallet, signer, account } = useWallet();

  const shortAddress = account
    ? `${account.slice(0, 8)}...${account.slice(-6)}`
    : null;

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-black border-b border-neutral-800">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LEFT — LOGO */}
        <div className="flex items-center gap-3 text-white font-semibold text-lg">
          <img src={logo} alt="NFTorium" className="w-10 h-10" />
          <span>NFTorium</span>
        </div>

        {/* CENTER — INFO (ONLY WHEN NOT CONNECTED) */}
        {!signer && (
          <div className="hidden md:block text-sm text-neutral-400">
            Connect your wallet to continue exploring NFTs
          </div>
        )}

        {/* RIGHT — ACTIONS */}
        <div className="flex items-center gap-4">
          {/* GitHub */}
          <a
            href="https://github.com/your-username/nftorium"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition"
            title="Open source on GitHub"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.748-1.026 2.748-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.31.678.92.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>

          {/* WALLET */}
          <button
            onClick={connectWallet}
            className="
              px-5 py-2 rounded-lg
              border border-neutral-700
              text-white font-medium
              bg-neutral-900
              hover:bg-neutral-800
              transition
            "
          >
            {signer ? shortAddress : "Connect Wallet"}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
