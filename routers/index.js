const express = require('express');
const router =  express.Router();
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

const UserController = require('../controllers/UserController');
const ProductController = require('../controllers/ProductController');

router.post('/login', UserController.login);
router.use(authentication);

router.get('/products', ProductController.listProduct);
router.post('/products', authorization, ProductController.addProduct);

// router.get('/products/:id', authorization, ProductController.editProduct);
router.put('/products/:id', authorization, ProductController.updateProduct);
router.delete('/products/:id', authorization, ProductController.delete);

module.exports = router;