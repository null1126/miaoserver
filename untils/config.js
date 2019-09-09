var mongoose = require('mongoose');
var nodemailer = require('nodemailer')

//配置链接数据库
var Mongoose = {
    url: 'mongodb://localhost/miao',
    connect() {
        mongoose.connect(this.url, { useNewUrlParser: true }, (err) => {
            if (err) {
                console.log('链接失败')
                return
            }
            console.log('链接成功')
        })
    }
}

//配置验证邮箱
var Email = {
    config: {
        host: 'smtp.qq.com',
        port: 587,
        auth: {
            user: '1538583867@qq.com', // 发件人邮箱
            pass: 'nwshydlmixhkjaca' // 发件人密码 秘钥 在qq邮箱中生成
        }
    },
    get transporter() {
        return nodemailer.createTransport(this.config)
    },
    //随机生成的验证码
    get verify() {
        return Math.random().toString().substring(2, 6)
    },
    //返回毫秒数
    get time() {
        return Date.now()
    }
}

module.exports = {
    Mongoose,
    Email
}