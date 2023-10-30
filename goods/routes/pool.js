var mysql=require('mysql')
var pool = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'mysql',
    database:'goodsdb',
    multipleStatements:true
}) 

module.exports = pool;