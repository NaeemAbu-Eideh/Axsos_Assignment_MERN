import  React, {useState} from 'react'
import axios from "axios";

const Form = (props) => {
    const [title, setTitle] = useState('')
    const [number, setNumber] = useState('')
    const [des, setDes] = useState('')
    const { products ,setProducts } = props
    const changeTitle = (e) =>{
        e.preventDefault()
        setTitle(e.target.value)
    }
    const changePrice = (e) =>{
        e.preventDefault()
        setNumber(e.target.value)
    }
    const changeDes = (e) =>{
        e.preventDefault()
        setDes(e.target.value)
    }

    const createProduct = (e) =>{
        e.preventDefault()
        let product = {
            title: title,
            price: number,
            description: des,
        }
        setProducts(prev => (Array.isArray(prev) ? [...prev, product] : [product]));
        console.log(product);
        axios.post("http://localhost:3000/api/products/create", product).then(res=>console.log(res))
            .catch(err=>console.log(err));

    }

    return (
        <>
            <h1 className={"text-3xl text-center my-10"}>Product Manager</h1>
            <div className="mx-auto w-200">
                <div className={"flex mb-4 justify-between w-100"}>
                    <label className={"text-[1.3em] mr-5"}>Title:</label>
                    <input onChange={(e) => changeTitle(e)} type={"text"} className={"border"}/>
                </div>
                <div className={"flex mb-4 justify-between w-100"}>
                    <label className={"text-[1.3em] mr-5"}>Price:</label>
                    <input onChange={(e) => changePrice(e)} type={"text"} className={"border"}/>
                </div>
                <div className={"flex mb-4 justify-between w-100"}>
                    <label className={"text-[1.3em] mr-5 "}>Description:</label>
                    <textarea onChange={(e) => changeDes(e)} className={"border"}></textarea>
                </div>
                <button  className={"text-[1.3em] mr-5 border px-3 py-2 w-50"} onClick={(e)=> createProduct(e)}>Create</button>
            </div>
        </>
    );
}

export default Form;