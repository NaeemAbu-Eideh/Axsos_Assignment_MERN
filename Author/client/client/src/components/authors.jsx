import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {deleteAuthor} from "../functions/api.jsx";


const Authors = (props) => {
    const {authors, setAuthors} = props;
    return (
        <>
            <Link to={"/authors/new"} className={"text-center block underline text-blue-600 text-[1.3em] mb-3"} >Add an author</Link>
            <p className={" text-center text-purple-600 text-[1.3em] mb-3"} >We have quotes by:</p>
            <table className={"border w-200 mx-auto"}>
                <thead>
                    <tr className={"border bg-gray-400"}>
                        <th className={"border"}>Author</th>
                        <th className={"border"}>Action Available</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        authors.map((author, index) => (
                            <tr key={index} className={"border odd:bg-gray-200"}>
                                <td className={"border pl-2"}>{author.username}</td>
                                <td className={"border pl-2 py-4"}>
                                    <div className={"flex justify-between w-70 mx-auto"}>
                                        <Link to={`/authors/${author._id}/edit`} className={"flex justify-center items-center  bg-gray-600 w-30 h-10 border"}>Edit</Link> |
                                        <button className={"flex justify-center items-center  bg-gray-600 w-30 h-10 border"} onClick={(e)=> deleteAuthor(e, author._id, setAuthors)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>


            </table>
        </>
    )
}

export default Authors;