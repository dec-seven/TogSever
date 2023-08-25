// 导入模块
const mysql = require('mysql2');

// 创建一个数据库连接
const connection = mysql.createConnection({
  host: '101.42.9.100',
  port: 3306,  
  user: 'ton',
  password: '123456',  
  database: 'ton',
});

connection.connect(error => {  
  if (error) {  
    console.error('Error connecting to MySQL database:', error);  
    return;  
  }  
  console.log('Connected to MySQL database!');  
});

'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
  ['Page', 45]
// 简单查询
connection.query( 'SELECT * FROM `user` WHERE `USER_NAME` = ?',
  function(err, results, fields) {
    console.log(results); // 结果集
    console.log(fields); // 额外的元数据（如果有的话）
  }
);

// 使用占位符
// connection.query(
//   'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//   ['Page', 45],
//   function(err, results) {
//     console.log(results);
//   }
// );

// 关闭链接
connection.end(error => {  
  if (error) {  
    console.error('Error closing MySQL connection:', error);  
    return;  
  }  
  console.log('MySQL connection closed successfully!');  
});

module.exports = connection