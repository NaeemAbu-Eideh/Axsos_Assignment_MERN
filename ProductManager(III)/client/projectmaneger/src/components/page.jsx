import React from "react"
import Form from "./form.jsx";
import Products from "./products.jsx";

const Page = (props) => {
    const { products, setProducts, setCheck } = props;
    return (
        <>
            <Form products={products} setProducts={setProducts} />
            <Products setCheck={setCheck} products={products}/>
        </>
    );
}

export default Page;