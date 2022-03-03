const mysql2 = require('mysql2');
const CONFIG = require('../config/conf')

var mysqlConnection = mysql2.createConnection({
    host: CONFIG.db_host,
    user: CONFIG.db_user,
    password: CONFIG.db_password,
    database: CONFIG.db_name,
    multipleStatements: true
});

var sql = "CREATE TABLE IF NOT EXISTS user (StudentId int NOT NULL AUTO_INCREMENT PRIMARY KEY, Username VARCHAR(255), Email VARCHAR(255), Password VARCHAR(255), ScoreObtained INT, ScoreTotal INT, Percentage VARCHAR(255), Status VARCHAR(255))";

mysqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Table created");
});


module.exports =  mysqlConnection;