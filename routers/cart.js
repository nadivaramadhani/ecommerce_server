const router = require('express').Router();
const CartController = require('../controllers/cartController');
const { authorizationCart, authorizationCustomer } = require('../middlewares/authorization');

// router.use(authorizationCustomer);
router.get('/', authorizationCustomer, CartController.getCart);
router.post('/', authorizationCustomer, CartController.addCart);
// router.use(authorizationCart);
router.patch('/:id', authorizationCart, CartController.updateCart);
router.delete('/:id', authorizationCart, CartController.delete);

module.exports = router;