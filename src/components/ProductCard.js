import React, {useEffect, useState, useContext} from "react";
import { CartContext } from "../context/CartContext";

export default function ProductCard({product}){
    const {name, price, _id} = product;

    const cart = useContext(CartContext);
    
    const productQuantity = cart.getProductQuantity(_id);

    return(
        <>
            <div className="product-card">
                    <h1>{name}</h1>
                    <h4>Price: {price}</h4>
                    <h4>In Cart: {productQuantity}</h4>
                    <div className="card-btn-container">
                    {productQuantity > 0 ? 
                        <>
                            <button onClick={() => cart.deleteFromCart(_id)}>Delete From Cart</button>
                            <button onClick={() => cart.addOneToCart(_id)}>+</button>
                            <button onClick={() => cart.removeOneFromCart(_id)}>-</button>
                        </>
                        :
                        <button onClick={() => cart.addOneToCart(_id, name, price)}>Add to Cart</button>
                    }
                        
                    </div>
            </div>
        </>
    )
}

