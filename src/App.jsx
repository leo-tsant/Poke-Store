import Header from "./Components/Header/index";
import Footer from "./Components/Footer/index";
import AppRoutes from "./Components/Routes/index";
import { ProductProvider } from "./Components/Store/ProductContext/index";

const App = () => {
    return (
        <ProductProvider>
            <div className="mainContainer">
                <Header />
                <AppRoutes />
                <Footer />
            </div>
        </ProductProvider>
    );
};

export default App;
