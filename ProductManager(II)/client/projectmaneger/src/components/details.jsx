import React, {useState} from "react";
import {Link, useParams} from "react-router-dom";
const Details = (props)=>{
    const { products } = props
    const {id} = useParams();
    for(let i =0 ; i < products.length ; i++){
        if(products[i]._id === id){
            return (
                <>
                    <div className={"w-100 mx-auto mt-25"}>
                        <div>
                            <h1 className={"text-3xl text-center mb-5"}>Title: {products[i].title}</h1>
                            <p className={"text-[1.3em] text-center mb-5"}>Price: {products[i].price}</p>
                            <p className={"text-[1.3em] text-center mb-20"}>Description: {products[i].description}</p>
                            <Link to={"/"} className={"ml-30 text-[1.5em] hover:underline hover:font-bold"}>Back to home</Link>
                        </div>
                    </div>
                </>
            );
        }
    }

    return (
        <></>
    )

}

export default Details;