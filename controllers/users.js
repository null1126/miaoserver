//控制器层
var { Email } = require('../untils/config.js')
var UserModel = require('../models/users.js')
let { encrypt, verifyImg } = require('../untils/base.js')
const login = async(req, res, next) => {
    var { username, password, Imgverify } = req.body
    if (Imgverify !== req.session.imgVerify) {
        res.send({
            msg: '图片验证码错误',
            status: -3
        })
        return
    }
    var result = await UserModel.findLogin({
        username,
        password: encrypt(password)
    })
    if (result) {
        //保存登录状态
        req.session.username = username
            //保存用户权限
        req.session.isAdmin = result.isAdmin,
            req.session.userHead = result.userHead
        if (result.isfreeze) {
            res.send({
                msg: '账号已冻结',
                status: -2
            })
        } else {
            res.send({
                msg: '登录成功',
                status: 0
            })
        }
    } else {
        res.send({
            msg: '登录失败',
            status: -1
        })
    }
}
const register = async(req, res, next) => {
        var { username, password, email, verify } = req.body
        if (email !== req.session.email || verify !== req.session.verify) {
            res.send({
                msg: '验证码错误',
                status: -1
            })
            return //验证码错误 不再执行下一步
        }
        // if (Email.time - req.session.time / 1000 > 6000) {
        //     res.send({
        //         msg: '验证码已超时',
        //         status: -3
        //     })
        //     return
        // }

        var result = await UserModel.save({
            username,
            password: encrypt(password),
            email
        });
        if (result) {
            res.send({
                msg: '注册成功',
                status: 0
            })
            return
        } else {
            res.send({
                msg: '注册失败',
                status: -2
            })
        }
    }
    //邮箱验证
const verify = async(req, res, next) => {
        //拿到需要发送的邮箱
        var email = req.query.email;
        //拿到生成的验证码
        var verify = Email.verify;
        //将验证码 及 邮箱都持久化
        req.session.verify = verify;
        req.session.email = email;
        //req.session.time = Email.time
        var mailOptions = {
            from: '滕讯科技 1538583867@qq.com', // 邮件来自于哪里
            to: email, // 发送指定的人
            subject: '腾讯视频', // 标题
            text: '您的邀请码是：' + verify, // 主体内容
            // html: '<b>Hello world?</b>' // html body
        };
        Email.transporter.sendMail(mailOptions, (err) => {
            if (err) {
                res.send({
                    msg: '发送失败',
                    status: -1
                })
            } else {
                res.send({
                    mes: "发送成功",
                    status: 0
                })
            }
        })
    }
    //退出登录
const logout = async(req, res, next) => {
        req.session.username = ''
        res.send({
            msg: '退出成功',
            status: 0
        })
    }
    //获取用户
const getUser = async(req, res, next) => {
        if (req.session.username) {
            res.send({
                msg: '获取用户信息成功',
                status: 0,
                data: {
                    username: req.session.username,
                    isAdmin: req.session.isAdmin,
                    userHead: req.session.userHead
                }
            })
        } else {
            res.send({
                msg: '获取用户信息失败',
                status: -1
            })
        }
    }
    //修改密码
const findPassword = async(req, res, next) => {
    var { email, password, verify } = req.body
    if (verify === req.session.verify && email === req.session.email) {
        var result = UserModel.findpassword(email, encrypt(password))
        if (result) {
            res.send({
                msg: '修改密码成功',
                status: 0
            })
        } else {
            res.send({
                msg: '修改密码失败',
                status: -2
            })
        }
    } else {
        res.send({
            msg: '验证码不正确',
            status: -1
        })
        return
    }
}
const verifyImgs = async(req, res, next) => {
    let option = {
        size: 4, //验证码长度
        width: 100,
        height: 40,
        background: "#f4f3f2", //干扰线条数
        noise: 2,
        fontSize: 30,
        ignoreChars: '0o1i', //验证码字符中排除'0o1i'
        color: true // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有    
    }
    let code = await verifyImg(option);
    //console.log(data)
    req.session.imgVerify = code.text.toLowerCase()
    res.send(
        code.data
    )
}

//修改头像
// const updateHead = async(req, res) => {
//     let { username, userhead } = req.body
//     let result = UserModel.updateHead(username, userhead)
//     if (result) {
//         send({
//             msg: '上传头像成功',
//             status: 0
//         })
//     } else {
//         send({
//             msg: '上传头像失败',
//             status: -1
//         })
//     }
// }
const loadUserhead = async(req, res) => {
    console.log(req.file)
}


module.exports = {
    login,
    register,
    verify,
    logout,
    getUser,
    findPassword,
    verifyImgs,
    loadUserhead
}