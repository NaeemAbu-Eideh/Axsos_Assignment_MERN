import React from "react";
import {Link} from "react-router-dom";
import Form from "./from.jsx";
import {addAuthor} from "../functions/functions.jsx";

const AddAuthor = (props) => {
    const {authors, setAuthors, setTarget} = props;
    return (
        <>
            <Link to={"/"} className={"text-center block mb-4 underline text-[1.3em] text-blue-600"}>Home</Link>
            <p className={" text-center text-purple-600 text-[1.3em] mb-3"} >Add a new author:</p>
            <Form setTarget = {setTarget} methods = {addAuthor} authors = {authors} setAuthors = {setAuthors}/>
        </>
    );
}

export default AddAuthor;