import React, {useEffect, useState, useContext} from "react";
import { CartContext } from "../context/CartContext";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CartItems({item}){
    const {name, price, id, quantity} = item;

    

    const cart = useContext(CartContext);

    const productQuantity = cart.getProductQuantity(id);

    // const cart = useContext(CartContext);
    
    // const productQuantity = cart.getProductQuantity(product.id);

    const [subTotal, setSubTotal] = useState(0)
    

    useEffect(() => {
        setSubTotal(productQuantity * price)
    }, [productQuantity])

    

    return(
        <>
        <div className="cart-item-container">
                <table>
                    <tr>
                        <td className="item-name">
                            <h2>{name}</h2>
                            <h4>Price: {price}</h4>
                        </td>
                        <td><h4>Subtotal: {subTotal}</h4></td>
                        <td>
                                <button className="btn-qty" onClick={() => cart.removeOneFromCart(id)}>-</button>
                                <input className="cart-input" value={productQuantity} disabled="true"></input>
                                <button className="btn-qty" onClick={() => cart.addOneToCart(id)}>+</button>
                        </td>
                        <td>
                            <button className="btn-dlt" onClick={() => cart.deleteFromCart(id)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </td>
                    </tr>
                </table>
            </div>
        </>
    )
}

