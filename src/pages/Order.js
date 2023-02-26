import React, {useState, useEffect} from "react";


import OrderItems from "../components/OrderItems";

//import axios base url and create url to fetch from backend
import axios from '../api/axios';
const CREATE_ORDER_URL = '/orders/getMyOrders';


export default function Orders(){

    const [orders, setOrders] = useState([]);

    const config = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
    }

    useEffect(() => {
        getOrders();
    }, [])
    
    const getOrders = async () => {
        try {
            const response = await axios.get(CREATE_ORDER_URL, config)
            .then(result => setOrders(result.data))
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
            <h1>Orders</h1>
            {orders.map((order) => {
                return(
                    <>
                        <OrderItems order={order} key={order._id}/>
                    </>
                )
            })}
            
        </>
    )
}