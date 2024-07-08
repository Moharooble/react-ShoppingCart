import { createContext, useContext, useReducer } from "react";
import shopReducer, { initialState } from "./shopReducer";


const ShopContext = createContext(initialState);

export const ShopProvider = ({ children }) => {
    const [state,dispatch] = useReducer(shopReducer,initialState)

    const addToCart = (product) => {

        const updatedProduct = state.products.concat(product);
        calculateTotal(updatedProduct)
        dispatch({
            type: "ADD_TO_CART",
            payload: {
                products: updatedProduct
            }
        });
    }

    const removeCart = (product) => {
        const updatedProduct = state.products.filter((pro) => pro.id !== product.id);
        calculateTotal(updatedProduct)

        dispatch({
            type: "REMOVE_FROM_CART",
            payload: {
                products: updatedProduct
            }
        })
    }

    const clearCart = (products) => {
        dispatch({
            type: "CLEAR_CART",
            payload: initialState
        })
    }

    const calculateTotal = (products) => {
        let total = 0;
        products.forEach(pro => {
            total += pro.price;
            
        });
        dispatch({
            type: "CALCULATE",
            payload: total
        })
    }


    const values = {
        products: state.products,
        total: state.total,
        addToCart,
        removeCart,
        clearCart
    
    }

    return <ShopContext.Provider value={values}>
                {children}
            </ShopContext.Provider>


}

const useShop = () => {
    const context = useContext(ShopContext);

    if(context === undefined){
        throw new Error("context must be used inside shopcontex")
    }
    return context;
}

export default useShop;