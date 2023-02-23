import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

import CartItems from "../components/CartItems";

export default function Cart(){

    const cart = useContext(CartContext)
    //console.log(cart);

    return(
        <>
            <div className="order-container">
                <div className="cart-items-container">
                        {cart.items.map((item) => {
                            return(
                                <>
                                    <CartItems key={item.id} item={item}/>
                                </>
                            )
                        })}
                    </div>
                <div className="order-summary-container">
                    <h1>Order Summary</h1>
                    <h4>Sub Total:{cart.getTotalCost}</h4>
                    <button className="btn-checkout">
                        CHECKOUT
                    </button>
                </div>
            </div>
        </>
    )
}