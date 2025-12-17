const ProductController = require('../controllers/product.controller');
module.exports = app => {

    app.get('/api/products/all', ProductController.findAllProducts);

    app.get('/api/products/:id', ProductController.findOneSingleProduct);

    app.patch('/api/products/:id/update', ProductController.updateExistingProduct);

    app.post('/api/products/create', ProductController.createNewProduct);

    app.delete('/api/products/:id/delete', ProductController.deleteAnExistingProduct);

}