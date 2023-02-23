import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

import { UserContext } from "../context/UserContext";

import axios from '../api/axios';
const PRODUCTS_URL = '/product/';


function Products(){
    
    const [products, setProducts] = useState([]);
	const {user} = useContext(UserContext);
    
    useEffect(() => {
       getProducts();
    }, [])
    

    const getProducts = async () => {
        await axios.get(PRODUCTS_URL)
        .then(result => {
            setProducts(result.data.map((product) => {
                return(
                    <>
                        <ProductCard product={product} key={product._id}/>
                    </>
                )
            }))
        })
    }


    // console.log(getProducts) 
    

    return (
        <motion.div 
            className="pricing"

            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            >
            <h1>Products</h1>
            <div className="products-container">   
                {products}
            </div>
        </motion.div>
    )
}

// useEffect(() => {
//         const products = axios.get(PRODUCTS_URL)
//         .then(result => {
//             setProducts(
//                 result.data.map(product => {
//                     return (
//                         <>
//                             <ProductCard key={product._id} product={product}/>
//                         </>
//                     )
//                 })
//             )
//         })
//         setProducts(products.data)
//     })


export default Products;