/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import axios from "axios";

const ProductContext = createContext({
    itemPrices: {},
});

export const ProductProvider = ({ children }) => {
    // eslint-disable-next-line no-unused-vars
    const itemPrices = {
        // Pokeball Price List
        "poke-ball": 50,
        "great-ball": 100,
        "ultra-ball": 200,
        "master-ball": 2000,
        "premier-ball": 200,
        "safari-ball": 500,
        "net-ball": 500,
        "luxury-ball": 500,
        "dive-ball": 500,
        "nest-ball": 500,
        "repeat-ball": 500,
        "timer-ball": 500,
        "heal-ball": 500,
        "cherish-ball": 1000,
        "dusk-ball": 500,
        "quick-ball": 500,

        // Other items Price List
        potion: 300,
        "super-potion": 700,
        "hyper-potion": 1200,
        "max-potion": 2500,
        "full-heal": 600,
        antidote: 100,
        "burn-heal": 250,
        "ice-heal": 250,
        awakening: 250,
        "paralyze-heal": 200,
        revive: 1500,
        "max-revive": 4000,
    };

    const [itemData, setItemData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const addItemToCart = (item, quantity) => {
        const existingItemIndex = cart.findIndex((cartItem) => cartItem.name === item.name);

        if (existingItemIndex !== -1) {
            const updatedCart = cart.map((cartItem, index) => {
                if (index === existingItemIndex) {
                    return { ...cartItem, quantity: quantity };
                }
                return cartItem;
            });
            console.log(updatedCart);
            setCart(updatedCart);
        } else {
            setCart([...cart, { ...item, quantity }]);
        }
    };

    const handleQuantityChange = (change, item) => {
        const updatedItemData = itemData.map((data) => {
            if (data.name === item.name) {
                const newQuantity = Math.max(1, data.quantity + change);
                setQuantity(newQuantity);
                return { ...data, quantity: newQuantity };
            }
            return data;
        });
        setItemData(updatedItemData);

        const updatedCart = cart.map((cartItem) => {
            if (cartItem.name === item.name) {
                return { ...cartItem, quantity: Math.max(1, cartItem.quantity + change) };
            }
            return cartItem;
        });

        setCart(updatedCart);
    };

    const handleDeleteItemFromCart = (item) => {
        const updatedCart = cart.filter((cartItem) => cartItem.name !== item.name);
        const deletedItem = itemData.find((item) => {
            return item.name === item.name;
        });
        const updatedItemData = itemData.map((data) => {
            if (data.name === deletedItem.name) {
                return { ...data, inCart: false };
            }
            return data;
        });
        setItemData(updatedItemData);
        setCart(updatedCart);
    };

    useEffect(() => {
        const fetchItemData = async () => {
            try {
                const response = await axios.get("https://pokeapi.co/api/v2/item?limit=15");

                const itemDetailsPromises = response.data.results.map(async (item) => {
                    const itemResponse = await axios.get(item.url);
                    const englishEntry = itemResponse.data.flavor_text_entries.find((entry) => entry.language.name === "en");

                    return {
                        name: itemResponse.data.name.replace(/\b\w/g, (char) => char.toUpperCase()).replace(/-/g, " "),
                        description: englishEntry ? englishEntry.text : "No description available",
                        price: itemPrices[itemResponse.data.name] || 500,
                        sprite: itemResponse.data.sprites.default,
                        quantity: 1,
                        inCart: false,
                    };
                });

                const itemDetails = await Promise.all(itemDetailsPromises);
                setItemData(itemDetails);
            } catch (error) {
                console.error("Error fetching item data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchItemData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ProductContext.Provider
            value={{ itemData, isLoading, cart, addItemToCart, handleQuantityChange, quantity, handleDeleteItemFromCart }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export default ProductContext;
