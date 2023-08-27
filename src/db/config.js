const mysqlConfig = {
  host: '101.42.9.100',
  port: 3306,  
  user: 'ton',
  password: '123456',  
  database: 'ton'
}

const redisConfig = {
  port: 6379, // Redis port
  host: "101.42.9.100", // Redis host
  username: "default", // needs Redis >= 6
  password: "123456",
  db: 0, // Defaults to 0
}

module.exports = {
  mysqlConfig,
  redisConfig
}
