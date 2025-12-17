import React, {useEffect, useState} from 'react'
import './App.css'
import axios from "axios";
import {Routes, Route, Link} from "react-router-dom";
import Products from "./components/products.jsx";
import Page from "./components/page.jsx";
import Details from "./components/details.jsx";
function App() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/products/all').then((response) => {
            setProducts(response.data);
            console.log(response.data);
        })
    }, [])

  return (
    <>
        <Routes>
            <Route element={<Page products={products} setProducts={setProducts} />} path={"/"}/>
            <Route element={<Details products={products} setProducts={setProducts} />} path={"/products/:id"}/>
        </Routes>
    </>
  )
}

export default App
