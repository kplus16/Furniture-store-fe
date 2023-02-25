import React, {useEffect, useState, useContext} from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";

export default function ProductCard({product}){
    const {name, price, _id} = product;

    const cart = useContext(CartContext);
    const {user} = useContext(UserContext)
    
    const productQuantity = cart.getProductQuantity(_id);

    const archive = async () => {

    }

    return(
        <>
            <div className="product-card">
                    <h1>{name}</h1>
                    <img src='https://via.placeholder.com/400' alt={name} width="400" height="400"></img>
                    <h2>Price: {price}</h2>
                    <div className="card-btn-container">
                    {user.isAdmin ?
                    <>
                        <button className="btn-addtocart" onClick="">Update</button>
                        <button className="btn-deletefromcart" onClick={archive}>Archive</button>
                    </>
                        :
                        productQuantity > 0 ? 
                        <>
                            
                            <button className="btn-qty" onClick={() => cart.removeOneFromCart(_id)}>-</button>
                                <span>In Cart: {productQuantity}</span>
                            <button className="btn-qty" onClick={() => cart.addOneToCart(_id)}>+</button>
                            <button className="btn-deletefromcart" onClick={() => cart.deleteFromCart(_id)}>Delete From Cart</button>
                            
                        </>
                        :
                        <button className="btn-addtocart" onClick={() => cart.addOneToCart(_id, name, price)}>Add to Cart</button>
                    }
                        
                    </div>
            </div>
        </>
    )
}

