import React, {useContext} from "react";
import ReactDOM from "react-dom" 
import { CartContext } from "../../context/CartContext";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'


export default function ProductDetails({open,  onClose, product}){

    
    const {name, price, description, _id} = product;

    const cart = useContext(CartContext);

    const productQuantity = cart.getProductQuantity(_id);


    if(!open) return null
    return ReactDOM.createPortal(
        <>
            <div className="modal">
            <div className="overlay" onClick={onClose}></div>
            <div className="modal-content-product">
                <button className="btn-close" onClick={onClose}>
                    <FontAwesomeIcon icon={faXmark} size="xl"/>
                </button>
                <h1>{name}</h1>
                <h1>Price: {price}</h1>
                <div>
                    <img src='https://via.placeholder.com/400' alt={name} width="400" height="400"></img>
                </div>
                <h4>{description}</h4>
                {productQuantity > 0 ? 
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
        </>,
        document.getElementById('modal-portal')
    )

}