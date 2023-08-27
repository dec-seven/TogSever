const express = require('express');
const app = express();
const DB = require('./db')

// 在中间件中启用了body-parser，以便能够解析请求主体中的数据
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: true }));

// 登录接口
app.post('/ton/user/login', (req, res) => {
  try {
    const { userName, userPassword } = req.body;
    if(!userName){throw new Error('登录名不能为空！')}
    if(!userPassword){throw new Error('登录密码不能为空！')}
    if (userName && userPassword) {
      DB.query('SELECT USER_PASSWORD FROM user WHERE USER_NAME = ?', [userName], function (results) {
        if (results[0].USER_PASSWORD === userPassword) {
          res.json({ code: 0, message: "登录成功", data: { token: '' } })
        } else {
          res.json({ code: 0, message: "登录失败", data: {} })
        }
      })
      // res.status(401).json({ error: 'Invalid credentials' });
      // 生成会话令牌并发送给客户端  
      // const token = generateToken(username);  
      // res.json( {code:0,message:"登录成功",data:{token:''}} );  
    } else {
      res.json({ code: -100, message: "参数不能为空", data: { } })
    }
  } catch (error) {
    res.json({ code: -100, message: error.message, data: { } })
  }

});

const port = 3000; // 可以根据需要更改端口号  
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



