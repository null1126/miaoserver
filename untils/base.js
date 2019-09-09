//引入密码加密内置模块
const crypto = require('crypto');
//图形验证码
const svgCaptcha = require('svg-captcha')

const secret = 'abcdefg$$$%%'; //加一些混淆字符
const encrypt = (info) => {
    return crypto.createHmac('sha256', secret)
        .update(info)
        .digest('hex');
}


const verifyImg = (option) => {
    // 验证码，有两个属性，text是字符，data是svg代码
    return svgCaptcha.create(option);
    // 保存到session,忽略大小写
    //req.session["randomcode"] = code.text.toLowerCase();
    // 返回数据直接放入页面元素展示即可

}
const Head = {
    baseUrl: 'http://localhost:3000/imgs/'
}


// res.send({
//     img: code.data
// });

module.exports = {
    encrypt,
    verifyImg,
    Head
}