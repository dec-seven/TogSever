const express = require('express');
const app = express();
const userRouter = require('./router/user')
const { errLog } = require('./utils/Log');

// 在中间件中启用了body-parser，以便能够解析请求主体中的数据
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: true }));


// app.use(async function(req,res,next){

// })

const port = 3000; 

app.listen(port, () => {
  console.log(`服务启动成功，运行端口:${port}`);
});

app.use('/user',userRouter)  // 挂载用户模块路由





// 捕获异常，不退出进程
process
  .on('unhandledRejection',(err) => {
    errLog({err,code:500,msg:"服务端系统异常",funName:"fatal"})
  })
  .on('uncaughtException',(err)=>{
    errLog({err,code:500,msg:"服务端系统异常",funName:"fatal"})
  })