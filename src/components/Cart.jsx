import useShop from "../ShopContext";

const Carts = ({product}) => {

    const { products,removeCart,total } = useShop();


    return(
        <div className="carts">
            <div className="cart_items">
            {products.map((product) => (
  
                <div className="cart_item"> 
                    <img src={product.urlImage} alt="" id="product_image" srcSet="" />
                    <h4 className="product_name">{product.name}</h4>
                    <span className="product_price">${product.price}</span>
                    <a  className="btn_small btn_remove" onClick={() => removeCart(product)}>&times;</a>
                </div>
                
                ))}
                <h3>Total Price: ${total}</h3>


        </div>
            
    </div>


    )
}

export default Carts;