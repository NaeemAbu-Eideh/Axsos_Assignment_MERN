import React from "react";
import {Link, useParams} from "react-router-dom";
import Form from "./from.jsx";
import {editAuthor} from "../functions/functions.jsx";

const EditAuthor = (props) => {
    const {authors, setAuthors, setTarget} = props;
    const{id} = useParams()
    return (
        <>
            <Link to={"/"} className={"text-center block mb-4 underline text-[1.3em] text-blue-600"}>Home</Link>
            <p className={" text-center text-purple-600 text-[1.3em] mb-3"} >Edit the author:</p>
            <Form id = {id} methods = {editAuthor} setTarget = {setTarget} authors = {authors} setAuthors = {setAuthors}/>
        </>
    );
}

export default EditAuthor;