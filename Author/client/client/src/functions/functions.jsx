import {addAuthorToDB, getAuthorById, updateAuthor} from "./api.jsx";

export const addAuthor = async (e, setError, navigate, error, authorText, setTarget, id = null) => {
    e.preventDefault();
    const object = {
        "username": authorText
    }
    const data = await addAuthorToDB(object, setError);
    if (data) {
        setTarget(data);
        navigate("/");
    }

}

export const editAuthor = async (e, setError, navigate, error, authorText, setTarget, id) => {
    e.preventDefault();
    let data = await getAuthorById(id);
    data.username = authorText;
    const tar = await updateAuthor(id, data, setError);
    if (tar) {
        setTarget(data);
        navigate("/");
    }
}