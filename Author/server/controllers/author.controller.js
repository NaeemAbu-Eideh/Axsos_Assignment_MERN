const Author = require('../models/author.model');

module.exports.findAllAuthors = async (req, res) => {

    try {
         const authors = await Author.find();
        res.json({authors: authors});
    } catch (err){
        res.json(err);
    }
}

module.exports.findOneSingleAuthor = async (req, res) => {

    try{
        const author = await Author.findOne({ _id: req.params.id });
        res.json({ author: author });
    }catch(err){
        res.json(err)
    }
}

module.exports.createNewAuthor = async (req, res) => {
    try {
        const author = await Author.create(req.body);
        return res.json({ author });
    } catch (err) {
        if (err.name === "ValidationError") {
            return res.status(400).json({ errors: err.errors });
        }
        return res.json(err);
    }
}

module.exports.updateExistingAuthor = async (req, res) => {

    try{
        const author = await Author.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });
        res.json({ author: author })
    }catch(err){
        if (err.name === "ValidationError") {
            return res.status(400).json({ errors: err.errors });
        }
        return res.json(err);
    }
}

module.exports.deleteAnExistingAuthor = async (req, res) => {
    try{
        const author = await Author.deleteOne({ _id: req.params.id });
        res.json({ result: author });
    }catch(err){
        res.json(err);
    }
}