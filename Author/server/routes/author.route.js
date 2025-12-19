const AuthorController = require('../controllers/author.controller');
module.exports = app => {

    app.get('/api/authors/all', AuthorController.findAllAuthors);

    app.get('/api/authors/:id', AuthorController.findOneSingleAuthor);

    app.patch('/api/authors/:id/update', AuthorController.updateExistingAuthor);

    app.post('/api/authors/create', AuthorController.createNewAuthor);

    app.delete('/api/authors/:id/delete', AuthorController.deleteAnExistingAuthor);

}