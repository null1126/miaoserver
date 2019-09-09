//管理员控制层
var UserModel = require('../models/users.js')
const index = async(req, res) => {
        res.send({
            isAdmin: req.session.isAdmin,
            msg: '管理员权限',
            status: 0
        })
    }
    //拿到所有用户信息
const userList = async(req, res) => {
        let userList = await UserModel.UserList()
        if (userList) {
            res.send({
                msg: 'ok',
                data: {
                    userList: userList
                },
                status: 0
            })
        } else {
            res.send({
                msg: '请求失败',
                status: -1
            })
        }
    }
    //修改冻结状态
const updateFreeze = async(req, res) => {
        let { email, isfreeze } = req.body
        let result = await UserModel.UpdateFreeze(email, isfreeze)
        if (result) {
            res.send({
                msg: 'ok',
                status: 0,
            })
        } else {
            res.send({
                msg: '冻结账号失败',
                status: -1,
            })
        }
    }
    //用户删除操作
const deleteUser = async(req, res) => {
    let email = req.body
    let result = await UserModel.DeleteUser(email)
    if (result) {
        res.send({
            msg: '删除账号成功',
            status: 0,
        })
    } else {
        res.send({
            msg: '删除账号失败',
            status: -1,
        })
    }
}

module.exports = {
    index,
    userList,
    updateFreeze,
    deleteUser
}