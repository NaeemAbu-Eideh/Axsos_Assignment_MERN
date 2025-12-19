import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Page from "./components/page.jsx";
import Details from "./components/details.jsx";

function App() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/products/all")
            .then((res) => {
                setProducts(res.data.products ?? res.data);
            })
            .catch(console.log);
    }, []);

    return (
        <Routes>
            <Route element={<Page products={products} setProducts={setProducts} />} path="/" />
            <Route element={<Details products={products} setProducts={setProducts} />} path="/products/:id" />
        </Routes>
    );
}

export default App;
