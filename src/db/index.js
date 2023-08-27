const mysql = require('mysql2');
const { mysqlConfig } = require('./config')

module.exports = {
  query: function (sql, params, callback) {
    const connection = mysql.createConnection(dbConfig)
    // 建立链接
    connection.connect(error => {
      if (error) { throw error }
      console.log('数据库开启成功!');
      // 链接成功开始操作数据
      console.log("LOG-SQL-QUERY:::", sql, params);
      connection.query(sql, params, function (error, results, fields) {
        try {
          console.log("LOG-SQL-RESULTS:::", results);
          if (error) { throw error }
          //将查询出来的数据返回给回调函数
          callback && callback(JSON.parse(JSON.stringify(results)), JSON.parse(JSON.stringify(fields)))
        } catch (error) {
          callback([], [])
        } finally {
          //关闭数据库
          connection.end(function (error) {
            if (error) { throw error }
            console.log('数据库关闭成功!');
          })
        }
      })
    });
  }
}

