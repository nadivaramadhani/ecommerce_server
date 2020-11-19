const router = require('express').Router();
const BannerController = require('../controllers/bannerController');
const authentication = require('../middlewares/authentication');
const { authorizationAdmin } = require('../middlewares/authorization');

router.get('/', BannerController.listBanner);
router.use(authentication);
router.post('/', authorizationAdmin, BannerController.addBanner);
router.put('/:id', authorizationAdmin, BannerController.updateBanner);
router.delete('/:id', authorizationAdmin, BannerController.delete);

module.exports = router;