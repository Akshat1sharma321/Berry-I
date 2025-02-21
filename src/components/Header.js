import { LOGO_CDN } from "../utils/constant";
import { useState, useEffect,useContext } from "react";
import { BrowserRouter, Link } from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "./UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [logBtn, setlogBtn] = useState("Login");
  const {loggedInUser} = useContext(UserContext);
  useEffect(() => {
    console.log("useEffect called");
  }, [logBtn]);
  const status = useOnlineStatus();
  const cartItems = useSelector((store)=>store.cart.items
  );
  console.log(cartItems);
  return (
    <div className="header flex justify-between h-20 bg-slate-200 ">
      <div className="logo-container h-10">
        <Link to="/">
          <img className="header-image w-20 p-4 h-20" src={LOGO_CDN}></img>
        </Link>
      </div>
      <div className="nav-container align-middle">
        <ul className="nav-items flex p-4 text-sm">
          <li className="p-2 border-2 border-black rounded-full m-2 bg-pink-100 font-gilroyLight">
            Status : {status ? "🟢" : "⭕"}
          </li>
          <li className="p-2 border-2 border-black rounded-full m-2 bg-pink-100 font-gilroyLight">
            <Link to="/"> Home</Link>
          </li>
          <li className="p-2 border-2 border-black rounded-full m-2 bg-pink-100 font-gilroyLight">
            <Link to="/about">About</Link>
          </li>
          <li className="p-2 border-2 border-black rounded-full m-2 bg-pink-100 font-gilroyLight font-semibold">
            <Link to="/cart">Cart - {cartItems.length} items</Link>
          </li>
          <li className="p-2 border-2 border-black rounded-full m-2 bg-pink-100 font-gilroyLight">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="p-2 border-2 border-black rounded-full m-2 bg-pink-100 font-gilroyLight">
            <Link to="/contact">{loggedInUser}</Link>
          </li>
          <button
            className="login-btn  p-2 border-2 border-black rounded-full m-2 bg-pink-100 font-gilroyLight"
            onClick={() => {
              logBtn === "Login" ? setlogBtn("Logout") : setlogBtn("Login");
            }}
          >
            {logBtn}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
