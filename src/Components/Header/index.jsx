import { Link } from "react-router-dom";
import { useContext } from "react";
import "./style.css";
import cartIcon from "../../assets/cart.svg";
import ProductContext from "../Store/ProductContext/index";

const Header = () => {
    const { cart } = useContext(ProductContext);
    return (
        <header className="header">
            <div className="leftHeader">
                <div className="title">
                    <Link to="/">
                        <span className="poke">Poké</span>
                        <span className="memo">Store</span>
                    </Link>
                </div>
                <div className="pages">
                    <div className="homeButton">
                        <Link to="/">Home</Link>
                    </div>
                    <div className="storeButton">
                        <Link to="/store">Store</Link>
                    </div>
                </div>
            </div>
            <div className="rightHeader">
                <div className="cartButton">
                    <Link to="/cart">
                        <img src={cartIcon} alt="cart" />
                        <span className="cartCount">{cart.length}</span>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
