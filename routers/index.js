const express = require('express');
const router =  express.Router();
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

const UserController = require('../controllers/userController');
const ProductController = require('../controllers/productController');
const BannerController = require('../controllers/bannerController');

router.post('/login', UserController.login);
router.use(authentication);

router.get('/products', ProductController.listProduct);
router.post('/products', authorization, ProductController.addProduct);

// router.get('/products/:id', authorization, ProductController.editProduct);
router.put('/products/:id', authorization, ProductController.updateProduct);
router.delete('/products/:id', authorization, ProductController.delete);

router.get('/banners', BannerController.listBanner);
router.post('/banners', authorization, BannerController.addBanner);
router.put('/banners/:id', authorization, BannerController.updateBanner);
router.delete('/banners/:id', authorization, BannerController.delete);

module.exports = router;