// 邮件发送需要用到我们设置好的邮箱参数和一个nodeMailer插件
const nodemailer = require('nodemailer');
const { generateCode } = require('.');
const redis = require('../db/redis');
/**
 * 发送邮件
 */
const sendEmail = (to) => {
    return new Promise(async (resolve,reject) => {
      // 判断redis验证码是否过期 ， 有效时间 > 60S 可以继续使用
      const redisCodeTime = await redis.ttl(to)
      if(redisCodeTime > 60){
        resolve("验证码尚在有效期，可继续使用！")
        return
      }
      const transporter = nodemailer.createTransport({
        host: 'smtp.qq.com',
        port: 465,
        secure: true,
        auth:{
          user:'670739394@qq.com',
          pass: "hqblfmszbjiebebh"
        }
      }) 
      // 生成6位数字验证码
      const code = generateCode()
      // 在redis存储验证码
      
      redis.set(to,code,"EX", 30 * 60)
      // 发送邮件
      const mailOptions = { from:'670739394@qq.com', to, subject: 'TOG验证码', html: code}
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) { reject(error)}
        resolve("验证码发送成功，有效期30分钟！")
      });
    })
}


module.exports = sendEmail