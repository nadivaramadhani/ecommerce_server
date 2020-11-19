const express = require('express');
const router =  express.Router();
const authentication = require('../middlewares/authentication');
const UserController = require('../controllers/userController');

const productRouter = require('./product');
const bannerRouter = require('./banner');
const cartRouter = require('./cart');


router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.use('/products', productRouter);
router.use('/banners', bannerRouter);
router.use(authentication);
router.use('/carts', cartRouter);

//>>>>>>>>>>>>> BATAS SUCI CMS KEMAREN <<<<<<<<<<<<<<
// router.get('/products', ProductController.listProduct);
// router.post('/products', authorizationAdmin, ProductController.addProduct);

// router.put('/products/:id', authorizationAdmin, ProductController.updateProduct);
// router.delete('/products/:id', authorizationAdmin, ProductController.delete);

// router.get('/banners', BannerController.listBanner);
// router.post('/banners', authorizationAdmin, BannerController.addBanner);
// router.put('/banners/:id', authorizationAdmin, BannerController.updateBanner);
// router.delete('/banners/:id', authorizationAdmin, BannerController.delete);


module.exports = router;