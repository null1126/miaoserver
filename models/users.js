var mongoose = require('mongoose');
//配置唯一值生效
mongoose.set('useCreateIndex', true)
var url = require('url')
var { Head } = require('../untils/base.js')

var UserSchema = new mongoose.Schema({
    username: {
        type: String, //类型
        required: true, //不能为空
        index: { unique: true } //唯一值      
    },
    password: {
        type: String, //类型
        required: true //不能为空
    },
    email: {
        type: String, //类型
        required: true, //不能为空
        index: { unique: true } //唯一值      
    },
    date: {
        type: Date, //日期类型
        default: Date.now() //默认时间
    },
    //是否是管理员
    isAdmin: {
        type: Boolean, //布尔值
        default: false
    },
    //是否冻结账号
    isfreeze: {
        type: Boolean,
        default: false
    },
    //头像
    userHead: {
        type: String,
        default: url.resolve(Head.baseUrl, 'bases.jpeg')
    }
})

//创建表模型
var UserModel = mongoose.model('user', UserSchema)
    //配置唯一值生效
UserModel.createIndexes()

/**
 * 添加的方法
 */
var save = (data) => {
    var user = new UserModel(data)
    return user.save()
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        })
}

/**
 * 查询登录用户名和密码
 */
var findLogin = (data) => {
    return UserModel.findOne(data)
}

/**
 * 修改密码
 */
var findpassword = (email, password) => {
    return UserModel.update({ email }, { $set: { password } })
        .then(() => {
            return true
        })
        .catch(() => {
            return false
        })
}

//返回所有用户
const UserList = () => {
        return UserModel.find()
    }
    //修改冻结状态
const UpdateFreeze = (email, isfreeze) => {
        return UserModel.update({ email }, { $set: { isfreeze } })
            .then(() => {
                return true
            })
            .catch(() => {
                return false
            })
    }
    //删除用户
const DeleteUser = (email) => {
    return UserModel.deleteOne(email)
        .then(() => {
            return true
        })
        .catch(() => {
            return false
        })
}

//修改头像
const updateHead = (username, userHead) => {
    return UserModel.update({ username }, { $set: { userHead } })
        .then(() => {
            return true
        })
        .catch(() => {
            return false
        })
}

module.exports = {
    save,
    findLogin,
    UserList,
    findpassword,
    UpdateFreeze,
    DeleteUser,
    updateHead
}