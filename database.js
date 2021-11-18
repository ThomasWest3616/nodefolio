var mysql = require("mysql")

var connection = mysql.createConnection({
    host: "localhost",
    database: 'nodefolie',
    user: 'root',
    password: 'password'
});

connection.connect(function(err) {
    if(err) throw err;
    console.log('Database connected!');
})

module.exports = connection;