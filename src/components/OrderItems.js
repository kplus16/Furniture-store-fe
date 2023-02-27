import React, {useState, useEffect} from "react";



export default function OrderItems({order}){

    const [productNames, setProductNames] = useState()

    const { products, purchasedOn, totalAmount} = order;

    useEffect(() => {
        setProductNames(products.map((product) => {
            if(product.productName.length > 0){
                return product.productName
            }
        }))
    }, [])

    //console.log(productNames)
    return (
        <>
            <table>
                    <tr>
                        <td>Date of Purchase: {purchasedOn}</td>
                        <td><h3>Items: {productNames?.join(", ")}</h3></td>
                        <td><h1>Total Amount: {totalAmount}</h1></td>
                    </tr>
            </table>
        </>
    )
}