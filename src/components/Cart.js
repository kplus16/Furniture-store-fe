import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";


export default function Cart(){

    const cart = useContext(CartContext)
    console.log(cart);

    return(
        <h1>Cart</h1>
    )
}