import { useContext } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import ProductContext from "./ProductContext/index";

const Store = () => {
    const { itemData, isLoading } = useContext(ProductContext);

    return (
        <div className="content">
            <div className="storeHeader">
                <span className="storeTitle">Items </span>
                <span className="numberOfStoreItems">{isLoading ? 0 : `(${itemData.length})`}</span>
            </div>

            <div className="pokemonItems">
                {isLoading ? (
                    <div>Loading items...</div>
                ) : (
                    itemData.map((item, index) => (
                        <Link key={index} to={`/store/${item.name}`}>
                            <div className="itemCard">
                                <img src={item.sprite} alt={item.name} width="90" />
                                <span className="itemName">{item.name}</span>
                                <span className="priceTag">{item.price}₽</span>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default Store;
