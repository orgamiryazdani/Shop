import { NavLink } from "react-router-dom";
import { useAuth } from "../../Providers/AuthProvider";
import { IoIosCart } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { RiHome3Fill } from "react-icons/ri";
import { useCart } from "../../Providers/CartProdvicer";
import "./Navigation.css";
const Navigation = () => {
  const { cart } = useCart();
  const userData = useAuth();
  return (
    <header className="mainNavigation">
      <nav>
        <ul>
          <div>shopping</div>
        </ul>
        <ul>
          <li>
            <NavLink to="/" activeClassName="activeLink" exact>
              <RiHome3Fill />
            </NavLink>
          </li>
          <li className="cartLink">
            <NavLink to="/cart" activeClassName="activeLink">
              <IoIosCart />
            </NavLink>
            <span>{cart.length}</span>
          </li>
          <li className="sign">
            <NavLink
              to={userData ? "/profile" : "/login"}
              activeClassName="activeLink"
            >
              {userData ? <AiOutlineUser /> : "Login / Signup"}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
