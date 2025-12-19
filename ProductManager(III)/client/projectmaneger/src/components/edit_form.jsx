import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditForm = (props) => {
    const [title, setTitle] = useState("");
    const [number, setNumber] = useState("");
    const [des, setDes] = useState("");

    const { setCheck} = props;
    const {id} = useParams()
    const navigate = useNavigate();

    const updateProduct = async (e) => {
        e.preventDefault();

        const object = {
            title: title,
            price: Number(number),
            des: des,
        };

        try {
            const data = await axios.patch(`http://localhost:3000/api/products/${id}/update`, object);
            console.log(data.data.product);
            setCheck((prev) => !prev);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <h1 className="text-3xl text-center my-10">Product Manager</h1>

            <form onSubmit={updateProduct} className="mx-auto w-200">
                <div className="flex mb-4 justify-between w-100">
                    <label className="text-[1.3em] mr-5">Title:</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className="border"
                    />
                </div>

                <div className="flex mb-4 justify-between w-100">
                    <label className="text-[1.3em] mr-5">Price:</label>
                    <input
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        type="text"
                        className="border"
                    />
                </div>

                <div className="flex mb-4 justify-between w-100">
                    <label className="text-[1.3em] mr-5">Description:</label>
                    <textarea
                        value={des}
                        onChange={(e) => setDes(e.target.value)}
                        className="border"
                    />
                </div>

                <div className="flex gap-3">
                    <button type="submit" className="text-[1.3em] border px-3 py-2 w-50">
                        Update
                    </button>

                    <Link to="/" className="text-[1.3em] border px-3 py-2 w-50 text-center">
                        Cancel
                    </Link>
                </div>
            </form>
        </>
    );
};

export default EditForm;
