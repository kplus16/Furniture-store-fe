import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import ProductCard from "../components/ProductCard";
import { UserContext } from "../context/UserContext";

import axios from '../api/axios';
const PRODUCTS_URL = '/product/';


function Products(){
    
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState("");
    const [isActive, setIsActive] = useState(true)
    const [filteredProducts, setFilteredProducts] = useState([])
	const {user} = useContext(UserContext);
    
    useEffect(() => {
       getProducts();
    }, [])

    const getProducts = async () => {
        await axios.get(PRODUCTS_URL)
        .then(result => {
                setFilteredProducts(result.data.filter(product => 
                    product.isActive === true
                ));
                setProducts(result.data);
            }
        )
    }

    useEffect(() => {
       filterProducts(query);
    }, [query])

    useEffect(() => {
       filterActiveProducts(isActive)
    }, [isActive])

    const filterProducts = (query) => {
        if(!query){
            setFilteredProducts(products)
        }else{
            setFilteredProducts(products.filter((product) => 
                product.name.toLowerCase().includes(query.toLowerCase()))
            )
        }
    }

    const filterActiveProducts = (isActive) => {
        if(isActive){
            setFilteredProducts(products.filter(product => 
                    product.isActive === true
            ));
        }else{
            setFilteredProducts(products)
        }
    }

    


    // console.log(getProducts) 
    

    return (
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            >
            <div className="search-bar-container">
            <div className="search-bar">
                <label className="search-label">
                    <FontAwesomeIcon icon={faSearch} size="xl"/>
                </label>
                <input className="search-input" type="text" onChange={(e) => setQuery(e.target.value)}></input>
            </div>
            </div>
            {user.isAdmin ? 
                <div className="toggle-switch">
                <h3>Toggle to see InActive Products</h3>
                    <label class="switch">
                        <input type="checkbox" onClick={() => setIsActive((prev) => !prev)}></input>
                        <span class="slider round"></span>
                    </label>
                </div>
                :
                <></>
            }
            
            <div className="products-container">   
                {filteredProducts.map((product) => {
                   return(
                    <>
                        <ProductCard product={product} key={product._id}/>
                    </>
                   ) 
                })}
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