const express = require('express');
const router = express.Router();
const postCtrl = require('./posts.ctrl');

router.get('/', postCtrl.getPosts);
router.get('/:id', postCtrl.getPost);
router.post('/keep', postCtrl.keep);
router.get('/keep/:userId', postCtrl.getkeeps);

module.exports = router;