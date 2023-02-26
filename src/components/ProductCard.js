import React, {useEffect, useState, useContext} from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import UpdateModal from "./Modals/UpdateModal";
import ProductDetails from "./Modals/ProductDetails";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import axios from '../api/axios';
const ARCHIVE_PRODUCT_URL = '/product/archiveProduct/';



export default function ProductCard({product}){

    const MySwal = withReactContent(Swal)

    const {name, price, _id, isActive} = product;

    const cart = useContext(CartContext);
    const {user} = useContext(UserContext)

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [ isDetailsOpen, setIsDetailsOpen ] = useState(false);
    
    const productQuantity = cart.getProductQuantity(_id);

    const config = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
    }


    const archive = async () => {
        try {
            const response = await axios.put(ARCHIVE_PRODUCT_URL+_id, null,  config)
            console.log(response);
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
            <div className="product-card" onClick={() => setIsDetailsOpen(true)}>
                    <h1>{name}</h1>
                    <img src='https://via.placeholder.com/400' alt={name} width="400" height="400"></img>
                    <h2>Price: {price}</h2>
                    <div className="card-btn-container">
                    {user.isAdmin ?
                    <>
                        <button className="btn-addtocart" onClick={() => setIsModalOpen(true)}>Update</button>
                        {isActive ? 
                        <button className="btn-deletefromcart" onClick={archive}>Archive</button>
                        :
                        <button className="btn-deletefromcart" onClick={archive}>UnArchive</button>
                        }
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
            <UpdateModal open={isModalOpen} onClose={() => setIsModalOpen(false)} product={product} ></UpdateModal>
            <ProductDetails open={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} product={product}></ProductDetails>
        </>
        
    )
}

