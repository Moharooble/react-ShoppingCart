import { Link } from "react-router-dom";
import useShop from "../ShopContext";
import Carts from "../components/Cart";
import Payment from "../components/Payment";

const Cart = () => {

    const {products} = useShop();

    if(products.length <= 0){
        return(
            <div className="emty">
                <div className="cart-emty">
                <Link to="/"><i className="fa-solid fa-cart-shopping"></i></Link>
                <h1>Cart is Emty</h1>
                <span>Add Products</span>
                </div>

            </div>
        )
    }

    return(
        <div className="cart_pages">
            <div className="cart_page">
                <Carts/>
                <Payment/>
            </div>

        </div>
    ) 
}

export default Cart;