import React, {useEffect, useState} from 'react'
import './App.css'
import Form from "./components/form.jsx";
import axios from "axios";
function App() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api').then((response) => {
            setProducts(response.data);
        })
    }, [])

  return (
    <>
        <Form products={products} setProducts={setProducts} />
    </>
  )
}

export default App
