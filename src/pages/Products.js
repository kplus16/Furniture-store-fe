import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

//product card
import ProductCard from "../components/ProductCard";

//user context
import { UserContext } from "../context/UserContext";

import CreateProduct from "../components/Modals/CreateProduct";

import axios from '../api/axios';
const PRODUCTS_URL = '/product/';


function Products(){
    
	const {user} = useContext(UserContext);
    const [products, setProducts] = useState([]); // store all products
    const [query, setQuery] = useState(""); //for search bar
    const [isActive, setIsActive] = useState(true);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const [ isNewProductOpen, setIsNewProductOpen ] = useState(false)

    useEffect(() => {
       getProducts();
    }, [])

    const getProducts = async () => {
        await axios.get(PRODUCTS_URL)
        .then(result => {
            if(user.isAdmin){
                setFilteredProducts(result.data.filter(product => 
                    product.isActive === true
                ));
                setProducts(result.data);
            }else{
                setFilteredProducts(result.data.filter(product => 
                    product.isActive === true
                ));
                setProducts(result.data.filter(product => 
                    product.isActive === true
                ));
            } 
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
                <>
                    <div className="toggle-switch">
                    <h3>Toggle to see InActive Products</h3>
                    <label className="switch">
                        <input type="checkbox" onClick={() => setIsActive((prev) => !prev)}></input>
                        <span className="slider round"></span>
                    </label>
                </div>
                <div className="toggle-switch">
                    <button className="btn-addnewproduct" onClick={() => setIsNewProductOpen(true)}>Add New Product</button>
                </div>
                </>
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
            <CreateProduct open={isNewProductOpen} onClose={() => setIsNewProductOpen(false)}></CreateProduct>
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