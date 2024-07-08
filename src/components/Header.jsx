import { Link } from "react-router-dom";
import useShop from "../ShopContext";



const Header = () => {
    const {products} = useShop()
    return(
        <div className="menu">
            <div className="logo">
            <Link to="/">HILAAL</Link>
            </div>
            <div className="menu-items">
                <Link to="/">Home</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/cart">Cart</Link>
            </div>
            <div className="cart">
                <Link to="/cart"><i className="fa-solid fa-cart-shopping"></i></Link>
                <span>{products.length}</span>
            </div>
        </div>
    )
}

export default Header;