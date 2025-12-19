import React from "react";
import {Router, Route, Link} from "react-router-dom";
import axios from "axios";
const Products = (props)=>{
    const { products, setCheck } = props;

    const deleteProduct = async (e, id) =>{
        e.preventDefault();
        await axios.delete(`http://localhost:3000/api/products/${id}/delete`);
        setCheck(prev => !prev);
    }

    return (
        <>
            <h1 className={"text-3xl font-bold text-center mt-10 mb-6"}>All products:</h1>
            <div className={"pb-10"}>
                {
                    products.map((el, index)=>
                        <div key={index} className={"flex mx-auto w-100 mb-4"}>
                            <Link className={"text-[1.5em]  hover:underline hover:font-bold mr-6"} to={`/products/${el._id}`}>{el.title}</Link>
                            <button className={"border text-center p-2 text-[1.3em] mr-6"} onClick={(e) => deleteProduct(e, el._id)}>Delete</button>
                            <Link to={`/products/${el._id}/edit`} className={"border text-center p-2 text-[1.3em] mr-6"}>Edit</Link>
                        </div>
                    )
                }
            </div>
        </>
    );
}

export default Products;