var express = require('express');
var controllersAdmin = require('../controllers/admin.js')
var router = express.Router();

/* 拦截器 当用户不是管理员时 不进行下一步操作*/
router.use((req, res, next) => {
    if (req.session.username && req.session.isAdmin) {
        next()
    } else {
        res.send({
            msg: '没有管理员权限',
            status: -1
        })
    }
})

router.get('/', controllersAdmin.index);
router.get('/userList', controllersAdmin.userList)
router.post('/updatefreeze', controllersAdmin.updateFreeze)
router.post('/deleteuser', controllersAdmin.deleteUser)

module.exports = router;