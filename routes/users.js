var express = require('express');
var controllersUser = require('../controllers/users.js')
var router = express.Router();
var multer = require('multer')
var upload = multer({ dest: 'public/imgs' })

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/login', controllersUser.login)
router.post('/register', controllersUser.register)
router.get('/verify', controllersUser.verify)
router.get('/logout', controllersUser.logout)
router.get('/getUser', controllersUser.getUser)
router.post('/findPassword', controllersUser.findPassword)
router.get('/verifyImgs', controllersUser.verifyImgs)
router.post('/loadUserhead', upload.single('file'), controllersUser.loadUserhead)

module.exports = router;