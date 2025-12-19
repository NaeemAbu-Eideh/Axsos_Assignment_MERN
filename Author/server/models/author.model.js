const mongoose = require('mongoose');
const AuthorSchema = new mongoose.Schema({
    username: {
        type: String,
        // required: true,
        // minLength: 3,
        // message: "Username is required and must be at least 3 characters",
        required: [
            true,
            "text is required",
        ],
        minlength: [
            3,
            "text must at least have 3 characters"
        ],
    }
});
const Author = mongoose.model('Product', AuthorSchema);
module.exports = Author;