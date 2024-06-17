import { useContext } from "react";
import ProductContext from "../Store/ProductContext/index";
import { Link } from "react-router-dom";
import "./style.css"; // Make sure you have the CSS file

const Cart = () => {
    const { cart, handleQuantityChange, handleDeleteItemFromCart } = useContext(ProductContext);

    // Calculate total cost
    const totalCost = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="cartContent">
            <div className="cartHeader">
                <span className="cartTitle">Cart </span>
                <span className="numberOfItemsInCart">({cart.length})</span>
            </div>
            <div className="cartBody">
                {" "}
                {cart.length > 0 ? (
                    <div className="cartInfo">
                        <ul>
                            {cart.map((item, index) => (
                                <li className="cartItem" key={index}>
                                    <Link to={`/store/${item.name}`}>
                                        <div className="itemImage">
                                            <img src={item.sprite} alt="item.name" width="100" />
                                        </div>
                                    </Link>
                                    <div className="itemCartDetails">
                                        <span className="itemName">{item.name}</span>
                                        <div>Quantity: {item.quantity}</div>
                                    </div>
                                    <div className="quantityControls">
                                        <button className="minusButton" onClick={() => handleQuantityChange(-1, item)}>
                                            -
                                        </button>
                                        <span className="quantity">{item.quantity}</span>
                                        <button onClick={() => handleQuantityChange(1, item)}>+</button>
                                    </div>
                                    <div className="priceTag" style={{ justifySelf: "flex-start" }}>
                                        {item.price * item.quantity}₽
                                    </div>
                                    <div className="removeFromCart">
                                        <button className="deleteFromCartButton" onClick={() => handleDeleteItemFromCart(item)}>
                                            X
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="orderSummary">
                            <div className="cost">
                                <div className="totalCost">Total Cost: </div>
                                <span className="priceTag">{totalCost}₽</span>
                            </div>
                            <button className="checkoutButton">Checkout</button>
                        </div>
                    </div>
                ) : (
                    <div className="emptyCart">Your cart is empty.</div>
                )}
            </div>
        </div>
    );
};

export default Cart;
