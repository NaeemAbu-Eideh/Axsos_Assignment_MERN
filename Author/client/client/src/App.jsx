import {useEffect, useState} from 'react'
import './App.css'
import {Link, Route, Routes} from "react-router-dom";
import Authors from "./components/authors.jsx";
import AddAuthor from "./components/add_author.jsx";
import {fetchAuthors} from "./functions/api.jsx";
import EditAuthor from "./components/edit_author.jsx";

function App() {
    const [authors, setAuthors] = useState([])
    const[target, setTarget] = useState({});
    useEffect(() => {
        fetchAuthors(setAuthors);
    }, [target]);
        return (
            <>
                <h1 className={"text-3xl text-center mt-10 mb-6 font-bold"}>Favorite Authors</h1>
                <Routes>
                    <Route path={"/"} element={<Authors authors={authors} setAuthors={setAuthors} />}/>
                    <Route path={"/authors/new"} element={<AddAuthor setTarget = {setTarget} authors={authors} setAuthors={setAuthors} />}/>
                    <Route path={"/authors/:id/edit"} element={<EditAuthor setTarget = {setTarget} authors={authors} setAuthors={setAuthors} />}/>
                </Routes>
            </>
        )
}

export default App
