import { Link } from "react-router-dom";
import "./style.css";

const Home = () => {
    return (
        <div className="container">
            <div className="welcomeText">
                <span className="welcomeTrainer">Welcome, Trainer! </span>
                <br />
                <span className="description">Your one-stop store for all the things you&apos;ll need in your journey!</span>
            </div>
            <div className="shopButton">
                <Link to="/store">
                    <button>Shop Now!</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
