import { Routes, Route } from "react-router-dom";
import Home from "../Home/index";
import Store from "../Store/index";
import Cart from "../Cart/index";
import ItemDetails from "../Store/ItemDetails/index";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/store/:itemName" element={<ItemDetails />} />
            <Route path="/cart" element={<Cart />} />
        </Routes>
    );
};

export default AppRoutes;
