const mysql = require('mysql2');
var dbConfig = require('./config')

module.exports = {
  query: function (sql, params, callback) {
    // 建立链接
    const connection = mysql.createConnection(dbConfig)
    connection.connect(error => {  
      if (error) {  throw error }  
      console.log('数据库开启成功!'); 
       
      // 链接成功开始操作数据
      connection.query(sql, params, function (error, results, fields) {
        if (error) {  throw error }

        //将查询出来的数据返回给回调函数
        callback && callback( JSON.parse(JSON.stringify(results)), JSON.parse(JSON.stringify(fields)))

        //关闭数据库
        connection.end(function (error) {
          if (error) { throw error }
          console.log('数据库关闭成功!');  
        })
      })
    });
  }
}

