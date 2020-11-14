const router = require('express').Router();
const userCtrl = require('./controllers/user');
const namesCtrl = require('./controllers/names');
const authMiddleware = require('./middleware/auth');

router.get('/user/:userId/liked', userCtrl.getLikedNames);
router.get('/user/:userId/seen', userCtrl.getSeenNames);
router.post('/user/:userId/liked/:nameId', userCtrl.updateLikedNames);
router.post('/user/:userId/seen/:nameId', userCtrl.updateSeenNames);

router.get('/user/:id', userCtrl.getUser);
router.post('/login', userCtrl.login);
router.post('/register', userCtrl.register);
router.put('/user/:id/link', authMiddleware, userCtrl.linkPartner);
router.put('/user/:id/code', authMiddleware, userCtrl.createLinkingCode);
// router.delete('/delete/:id', userCtrl.delete);

router.get('/names/:gender', namesCtrl.getNamesByGender);
router.get('/names/:id', namesCtrl.getName);

module.exports = router;
