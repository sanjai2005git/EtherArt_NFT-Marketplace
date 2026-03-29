import { NavLink } from "react-router-dom";
import { useWallet } from "../utils/WalletProvider";
import logo from "../assets/etherart.png";

const Nav = () => {
  const { connectWallet, signer, account } = useWallet();

  const shortAddress = account
    ? `${account.slice(0, 8)}...${account.slice(-6)}`
    : null;

  const navLinkClass = ({ isActive }) =>
    `
      px-3 py-1.5 rounded-md text-sm
      transition
      ${
        isActive
          ? "text-white bg-neutral-800"
          : "text-neutral-400 hover:text-white hover:bg-neutral-900"
      }
    `;

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-black/80 backdrop-blur border-b border-neutral-800">
      <nav className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* LEFT — BRAND */}
        <div className="flex items-center gap-3 text-white font-semibold text-lg">
          <img src={logo} alt="EtherArt" className="w-9 h-9" />
          <span className="tracking-wide">EtherArt</span>
        </div>

        {/* CENTER — ROUTES */}
        <div className="hidden md:flex items-center gap-2 font-mono text-xs">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/view" className={navLinkClass}>
            Explore
          </NavLink>

          <NavLink to="/list" className={navLinkClass}>
            List
          </NavLink>

          <NavLink to="/profile" className={navLinkClass}>
            Profile
          </NavLink>
        </div>

        {/* RIGHT — ACTIONS */}
        <div className="flex items-center gap-4">
          {/* Wallet Hint (only when disconnected) */}
          {!signer && (
            <span className="hidden lg:block text-xs text-neutral-500 font-mono">
              wallet:not_connected
            </span>
          )}

          {/* WALLET */}
          <button
            onClick={connectWallet}
            className="
              px-4 py-2 rounded-lg
              border border-neutral-700
              bg-neutral-900
              text-white text-sm font-mono
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
