import React from "react";
import ReactDOM from "react-dom" 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";

import axios from '../../api/axios';
const CREATE_PRODUCT_URL = '/product/createproduct';


export default function CreateProduct({open,  onClose}){

    const [ newName, setNewName ] = useState("")
    const [ newPrice, setNewPrice ] = useState("")
    const [ newDescription, setNewDescription ] = useState("")

    const config = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
    }

    const body = {
        name: newName,
        description: newDescription,
        price: newPrice
    }

    const createNewProduct = async () => {
        try {
            const response = await axios.post(CREATE_PRODUCT_URL, body, config)
            // if(response){

            // }
            console.log(response);
        } catch (error) {
            console.log(error)
        }
    }

    if(!open) return null
    return ReactDOM.createPortal(
        <>
        <div className="modal">
            <div className="overlay" onClick={onClose}></div>
            <div className="modal-content">
                <button className="btn-close" onClick={onClose}>
                    <FontAwesomeIcon icon={faXmark} size="xl"/>
                </button>
                <h1>Add new Product</h1>
                    <h4>Name: </h4>
                    <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} required></input>
                    <h4>Price: </h4>
                    <input type="number" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} required></input>
                    <h4>Description: </h4>
                    <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} required></input>
                    <h4>Image: </h4>
                    <input type="file"></input>
                    <div className="update-container">
                        <button className="btn-sign-in" onClick={createNewProduct}>Add New Product</button>
                    </div>
            </div>
        </div>
        </>,
        document.getElementById('modal-portal')
    )
}