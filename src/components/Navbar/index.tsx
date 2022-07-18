import { Link } from "react-router-dom";
import { connectWallet } from "../ConnectWallet";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/">
          <button className="btn btn-ghost normal-case text-xl">
            Skill2Token
          </button>
        </Link>
      </div>
      <div className="flex pr-1">
        <ul className="menu menu-horizontal p-0">
          <li className="btn-group">
            <Link to="/">
              <button>Home</button>
            </Link>
            <Link to="/whitepaper">
              <button>Whitepaper</button>
            </Link>
            <Link to="/whitelist">
              <button>Whitelist</button>
            </Link>
            <Link to="/community">
              <button>Community</button>
            </Link>
            <button
              className="btn btn-outline"
              id="connectWalletButton"
              onClick={() => connectWallet("connectWalletButton", "Connected")}
            >
              Connect Wallet
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
