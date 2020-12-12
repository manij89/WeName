const router = require('express').Router();
const userCtrl = require('./controllers/user');
const namesCtrl = require('./controllers/names');

router.get('/user/:userId/liked', userCtrl.getLikedNames);
router.get('/user/:userId/seen', userCtrl.getSeenNames);
router.post('/user/:userId/liked/:nameId', userCtrl.updateLikedNames);
router.post('/user/:userId/seen/:nameId', userCtrl.updateSeenNames);
router.delete('/user/:userId/liked/:nameId', userCtrl.deleteLikedName);

router.get('/user/:id', userCtrl.getUser);
router.post('/login', userCtrl.login);
router.post('/register', userCtrl.register);
router.put('/user/:id/link', userCtrl.linkPartner);

router.get('/names/gender/:gender', namesCtrl.getNamesByGender);
router.get('/names/:id', namesCtrl.getName);

module.exports = router;
