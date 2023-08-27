const express = require('express');
const DB = require('../db');

const router = express.Router()

const sendEmail = require('../utils/email')

// 登录接口
router.post('/login', (req, res) => {
  try {
    const { userName, userPassword } = req.body;
    if (!userName) { throw new Error('登录名不能为空！') }
    if (!userPassword) { throw new Error('登录密码不能为空！') }
    if (userName && userPassword) {
      DB.query('SELECT USER_PASSWORD FROM user WHERE USER_NAME = ?', [userName], function (results) {
        if (results.length === 0) {
          res.json({ code: 99, message: "用户不存在", data: {} })
        } else if (results[0].USER_PASSWORD !== userPassword) {
          res.json({ code: 99, message: "密码错误", data: {} })
        } else if (results[0].USER_PASSWORD === userPassword) {
          res.json({ code: 0, message: "登录成功", data: { token: '' } })
        } else {
          res.json({ code: -100, message: "未知异常", data: {} })
        }
      })
      // res.status(401).json({ error: 'Invalid credentials' });
      // 生成会话令牌并发送给客户端  
      // const token = generateToken(username);  
      // res.json( {code:0,message:"登录成功",data:{token:''}} );  
    } else {
      res.json({ code: -100, message: "参数不能为空", data: {} })
    }
  } catch (error) {
    res.json({ code: -100, message: error.message, data: {} })
  }

});


// 发送邮件验证码
router.post('/sendVerifyEmail', (req, res) => {
  const { userEmail } = req.body;
  sendEmail(userEmail)
    .then(emailRes => {
      console.log(emailRes);
      res.json({ code: 0, message:emailRes, data: {} })
    })
    .catch(error => {
      res.json({ code: 99, message:error, data: {} })
    })
})

module.exports = router