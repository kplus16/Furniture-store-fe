import React, {useEffect, useState, useContext} from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function ProductCard({product}){
    const {name, description, price, _id} = product;

    const cart = useContext(CartContext);
    
    const productQuantity = cart.getProductQuantity(product.id);

    const [quantity, setQuantity] = useState(0);
    
    useEffect(() => {
        setQuantity(0);
    }, [])

    

    return(
        <>
            
            <div className="product-card">
                    <h1>{name}</h1>
                    <h4>{description}</h4>
                    <h4>Price: {price}</h4>
                    <h4>{_id}</h4>
                    <div className="card-btn-container">
                        <button onClick={() => setQuantity((prevCount) => prevCount - 1)}>-</button>
                        {quantity}
                        <button onClick={() => setQuantity((prevCount) => prevCount + 1)}>+</button>
                        <button onClick={() => cart.addOneToCart(_id)}>Add to Cart</button>
                    </div>
            </div>

        </>
    )
}

