const mysql = require("mysql")
let db = mysql.createPool({
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    password: "",
    database: "health_admin_db",
    // connectionLimit:16
})

module.exports = db
