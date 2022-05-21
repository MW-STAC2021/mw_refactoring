const express = require('express');
const router = express.Router();
const userCtrl = require('./users.ctrl');

router.post('/join', userCtrl.join);
router.post('/login', userCtrl.login);
router.get('/:id', userCtrl.getUser);

module.exports = router;