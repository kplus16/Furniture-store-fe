import React from "react";
import ReactDOM from "react-dom" 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import axios from '../../api/axios';
const UPDATE_PRODUCT_URL = '/product/updateProduct/';


export default function UpdateModal({open,  onClose, product}){

    
    const MySwal = withReactContent(Swal)

    const {name, price, _id, description, isActive} = product;

    const [ newName, setNewName ] = useState(name)
    const [ newPrice, setNewPrice ] = useState(price)
    const [ newDescription, setNewDescription ] = useState(description)

    const config = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
    }

    const body = {
        name: newName,
        description: newDescription,
        price: newPrice
    }

    const update = async () => {
        try {
            const response = await axios.put(UPDATE_PRODUCT_URL+_id, body, config)
            MySwal.fire({
                    title: <strong>Successfully Updated {newName}!</strong>,
                    html: <i></i>,
                    icon: 'success'
            });
            onClose();
            //console.log(response);
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
                    <h1>Update {name}</h1>
                    <h4>Name: </h4>
                    <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)}></input>
                    <h4>Price: </h4>
                    <input type="number" value={newPrice} onChange={(e) => setNewPrice(e.target.value)}></input>
                    <h4>Description: </h4>
                    <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)}></input>
                    <div className="update-container">
                        <button className="btn-sign-in" onClick={update}>Save</button>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('modal-portal')
    )
}