const mysql = require("mysql")
let db = mysql.createPool({
    // host: "127.0.0.1",
    host: "localhost",
    port: "3306",
    user: "root",
    password: "123456",
    database: "health_admin_db",
    // connectionLimit:16
})

module.exports = db
