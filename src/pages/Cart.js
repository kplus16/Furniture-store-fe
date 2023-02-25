import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";

import CartItems from "../components/CartItems";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'



//import axios base url and create url to fetch from backend
import axios from '../api/axios';
const CREATE_ORDER_URL = '/orders/createOrder';

export default function Cart(){

    const MySwal = withReactContent(Swal)
    const cart = useContext(CartContext)
    const { user } = useContext(UserContext)
    //console.log(cart);
    const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);
    const productsCost = cart.getTotalCost().toFixed(2);
    const shippingCost = productsCount * 100;
    const totalCost = Number(productsCost) + Number(shippingCost);

    
    const [ errMsg, setErrMsg ] = useState('');

    const checkoutBody = cart.items.map((item) => ({
        productId : item.id,
        quantity : item.quantity
    }))

    const config = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
    }

    const checkout = async () => {
        if(!!user.email){
            if(user.isAdmin){
                MySwal.fire({
                    title: <strong>Admin can't check out!</strong>,
                    html: <i>Please, Log in first!</i>,
                    icon: 'error'
                })
            }else if(productsCount === 0){
                MySwal.fire({
                title: <strong>Your cart is empty!</strong>,
                html: <i>Please, add something first!</i>,
                icon: 'error'
            })
            }else{
                try {
                    const response = await axios.post(CREATE_ORDER_URL, checkoutBody, config)
                    MySwal.fire({
                        title: <strong>Checked Out!</strong>,
                        html: <i>Thank you for shopping with us!</i>,
                        icon: 'success'
                    });
                    console.log(response);
                    cart.emptyCart();
                } catch (error) {
                    if(!error?.response){
                        setErrMsg('No Server Response');
                    }
                }
                
            }
        }else{
            MySwal.fire({
                title: <strong>You're not logged in!</strong>,
                html: <i>Please, Log in first!</i>,
                icon: 'error'
            })
        }
        
    }

    return(
        <>
            <div className="order-container">
            <div className="cart-items-container">
            {productsCount > 0 ?
                    <>
                        {cart.items.map((item) => {
                            return(
                                    <CartItems key={item.id} item={item}/>
                                
                            )
                        })}
                    </>
                    :
                    <h1 className="text-center">There are no items in your cart!</h1>
            }
            </div>
                
                <div className="order-summary-container">
                    <h1>Order Summary</h1>
                    <h4>Sub Total: {productsCost}</h4>
                    <h4>Shipping: {shippingCost.toFixed(2)}</h4>
                    <h4>Total: {totalCost.toFixed(2)}</h4>
                    <button className="btn-checkout" onClick={checkout}>
                        CHECKOUT
                    </button>
                </div>
            </div>
        </>
    )
}