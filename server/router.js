const router = require('express').Router();
const userCtrl = require('./controllers/user');
const namesCtrl = require('./controllers/names');

router.get('/user/:id', userCtrl.getUser);
router.post('/login', userCtrl.login);
router.post('/register', userCtrl.register);
// router.delete('/delete/:id', userCtrl.delete);

router.post('/seen', userCtrl.updateSeenNames);
router.post('/liked', userCtrl.updateLikedNames);

router.get('/names/:gender', namesCtrl.getNamesByGender);

module.exports = router;
