import React, { useState } from "react";
import axios from "axios";

const Form = ({ setProducts }) => {
    const [title, setTitle] = useState("");
    const [number, setNumber] = useState("");
    const [des, setDes] = useState("");

    const createProduct = async (e) => {
        e.preventDefault();

        const product = {
            title,
            price: Number(number),        // أو parseFloat(number)
            description: des,
        };

        try {
            const res = await axios.post("http://localhost:3000/api/products/create", product);
            const createdProduct = res.data.product ?? res.data;
            setProducts((prev) => [...prev, createdProduct]);
            setTitle("");
            setNumber("");
            setDes("");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <h1 className={"text-3xl text-center my-10"}>Product Manager</h1>

            <form onSubmit={createProduct} className="mx-auto w-200">
                <div className={"flex mb-4 justify-between w-100"}>
                    <label className={"text-[1.3em] mr-5"}>Title:</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="border"/>
                </div>

                <div className={"flex mb-4 justify-between w-100"}>
                    <label className={"text-[1.3em] mr-5"}>Price:</label>
                    <input value={number} onChange={(e) => setNumber(e.target.value)} type="text" className="border"/>
                </div>

                <div className={"flex mb-4 justify-between w-100"}>
                    <label className={"text-[1.3em] mr-5"}>Description:</label>
                    <textarea value={des} onChange={(e) => setDes(e.target.value)} className="border"/>
                </div>

                <button className={"text-[1.3em] mr-5 border px-3 py-2 w-50"} type="submit">Create</button>
            </form>
        </>
    );
};

export default Form;
