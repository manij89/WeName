const router = require('express').Router();
const userCtrl = require('./controllers/user');
const namesCtrl = require('./controllers/names');

router.get('/user/:email', userCtrl.getUser);
router.post('/login', userCtrl.login);
router.post('/register', userCtrl.register);
// router.delete('/delete/:id', userCtrl.delete);

router.get('/names/:gender', namesCtrl.getNames);

module.exports = router;
