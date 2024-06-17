import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ProductContext from "../ProductContext/index";
import "./style.css";

const ItemDetails = () => {
    const { itemName } = useParams();
    const { itemData, addItemToCart, handleQuantityChange, quantity, handleDeleteItemFromCart, cart } = useContext(ProductContext);
    const [item, setItem] = useState(null);

    useEffect(() => {
        const foundItem = itemData.find((item) => item.name === itemName);
        setItem(foundItem);
    }, [itemName, itemData]);

    // Function to toggle adding/removing item from cart
    const toggleCartItem = (item) => {
        const existingItemIndex = cart.findIndex((cartItem) => cartItem.name === item.name);
        if (existingItemIndex !== -1) {
            // If item exists in cart, remove it
            handleDeleteItemFromCart(item);
        } else {
            // If item does not exist in cart, add it
            addItemToCart(item, quantity);
        }
    };

    // Check if item is loaded and has a price
    if (!item || !item.price) {
        return <div>Loading...</div>;
    }
    return (
        <div className="itemDetailsContainer">
            <div className="itemDetails">
                <div className="itemImage, itemDetailsCard">
                    <img src={item.sprite} alt={itemName} width="200" />
                </div>
                <div className="itemDescription">
                    <div className="itemName">{item.name}</div>
                    <div className="priceTag">{item.price * item.quantity}₽</div>
                    <div className="quantityControls">
                        <button className="minusButton" onClick={() => handleQuantityChange(-1, item)}>
                            -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(1, item)}>+</button>
                    </div>
                    <div>{item.description}</div>

                    {cart.some((cartItem) => cartItem.name === item.name) ? (
                        <div className="buttons">
                            <button className="addToCart" onClick={() => toggleCartItem(item)}>
                                Remove from Cart
                            </button>
                            <Link to="/cart">
                                <button className="goToCart">Go to Cart</button>
                            </Link>
                        </div>
                    ) : (
                        <button className="addToCart" onClick={() => toggleCartItem(item)}>
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ItemDetails;
