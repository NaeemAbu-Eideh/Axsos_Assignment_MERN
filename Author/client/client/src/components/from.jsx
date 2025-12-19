import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
const Form = (props) => {
    const [authorText, setAuthorText] = useState("");
    const [error, setError] = useState("");
    const {setTarget , methods, id} = props;
    const navigate = useNavigate();
    const addText = (e) => {
        e.preventDefault();
        setAuthorText(e.currentTarget.value);
    }

    return (
        <>
            <div className={"border w-100 mx-auto pb-10"}>
                <div className={"flex pt-10 px-10 mb-4"}>
                    <p className={"mr-20"}>Name</p>
                    <input onChange={(e) => addText(e)} type={"text"} className={"border w-100"}/>
                </div>
                <p className={"text-[1.3em] text-red-600 text-center"}>{error}</p>
            </div>
            <button onClick={ (e) => methods(e, setError, navigate, error, authorText, setTarget, id)} className={"border block w-50 p-2 mx-auto mt-5"}>Submit</button>
        </>
    );
}

export default Form;