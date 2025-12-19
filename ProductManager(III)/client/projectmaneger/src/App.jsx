import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Page from "./components/page.jsx";
import Details from "./components/details.jsx";
import EditForm from "./components/edit_form.jsx";

function App() {
    const [products, setProducts] = useState([]);
    const [check, setCheck] = useState(false);
    useEffect(() => {
        axios.get("http://localhost:3000/api/products/all")
            .then((res) => {
                setProducts(res.data.products ?? res.data);
                setCheck(false);
            })
            .catch(console.log);

    }, [check]);

    return (
        <Routes>
            <Route element={<Page setCheck = {setCheck} products={products} setProducts={setProducts} />} path="/" />
            <Route element={<Details products={products} setProducts={setProducts} />} path="/products/:id" />
            <Route element={<EditForm setCheck= {setCheck}/>} path={"/products/:id/edit"}/>
        </Routes>
    );
}

export default App;
