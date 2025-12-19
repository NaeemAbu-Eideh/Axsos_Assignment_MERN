import axios from "axios";

export const fetchAuthors = async (setAuthors) => {
    try {
        const res = await axios.get("http://localhost:3000/api/authors/all");
        setAuthors(res.data.authors);
    } catch (err) {
        console.log(err);
    }
};

export const addAuthorToDB = async (product, setError) => {
    try{
        const res = await axios.post("http://localhost:3000/api/authors/create", product);
        await setError("");
        return res.data;
    }catch(err){
        const errorResponse = err?.response?.data?.errors;

        if (!errorResponse) {
            console.log(err);
            return;
        }

        const errorArr = Object.keys(errorResponse).map(
            (key) => errorResponse[key].message
        );
        await setError(errorArr);

    }
}

export const deleteAuthor = async (e, id, setAuthors) => {
    e.preventDefault();
    try {
        await axios.delete(`http://localhost:3000/api/authors/${id}/delete`);
        setAuthors((prev) => prev.filter((author) => author._id !== id));
    } catch (err) {
        console.log(err);
    }
};

export const updateAuthor = async (id, author, setError) => {
    try{
        const res = await axios.patch(`http://localhost:3000/api/authors/${id}/update`, author);
        await setError("");
        return res.data.author;
    }catch(err){
        const errorResponse = err?.response?.data?.errors;

        if (!errorResponse) {
            console.log(err);
            return;
        }

        const errorArr = Object.keys(errorResponse).map(
            (key) => errorResponse[key].message
        );
        await setError(errorArr);
    }
}


export const getAuthorById = async(id) =>{
    const data = await axios.get(`http://localhost:3000/api/authors/${id}`);
    return data.data.author;
}