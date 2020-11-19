const express = require('express');
const router =  express.Router();
const ProductController = require('../controllers/productController');
const authentication = require('../middlewares/authentication');
const { authorizationAdmin } = require('../middlewares/authorization');

router.get('/', ProductController.listProduct);
router.get('/:id', ProductController.editProduct);
router.use(authentication, authorizationAdmin);
router.post('/', ProductController.addProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.delete);

// router.get('/', ProductController.listProduct);
// router.use(authentication);
// router.post('/', authorizationAdmin, ProductController.addProduct);
// router.put('/:id', authorizationAdmin, ProductController.updateProduct);
// router.delete('/:id', authorizationAdmin, ProductController.delete);

module.exports = router;