import React from "react";
import {Router, Route, Link} from "react-router-dom";
const Products = (props)=>{
    const { products } = props;

    return (
        <>
            <h1 className={"text-3xl font-bold text-center mt-10 mb-6"}>All products:</h1>
            {
                products.map((el)=>
                    <Link className={"block text-center text-[1.5em] hover:underline hover:font-bold"} to={`/products/${el._id}`}>{el.title}</Link>
                )
            }
        </>
    );
}

export default Products;