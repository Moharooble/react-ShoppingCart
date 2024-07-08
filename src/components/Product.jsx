import { useEffect, useState } from "react";
import useShop from "../ShopContext";

const Product = ({ product }) => {
    const { addToCart,products,removeCart } = useShop();
    const [isInCart,setInCart] = useState(false)
    useEffect(() => {
        const isCart = products.filter((pro) => pro.id === product.id)
        if(isCart.length > 0){
            setInCart(true)
        }else{
            setInCart(false)
        }

	},[products])


    const handleAddToCart = () => {
        if(isInCart){
            removeCart(product)
        }else{
            addToCart(product)
        }
    }

    // console.log(product)
    return (
            <div className="product">
                <div className="product-img">
                    <img src={product.urlImage} alt="" srcSet="" />
                </div>
                <div className="product-info">
                    <p className="product-name">{product.name}</p>
                    <p className="product-price">${product.price}</p>
                    <button className={isInCart && "removeCart"} onClick={handleAddToCart}>{isInCart ? "Revome Cart" : "Add To Cart"}</button>
                </div>
            </div>
    )
}

export default Product;