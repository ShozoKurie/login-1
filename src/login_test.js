"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var path_1 = require("path");
var mysql_1 = require("mysql");
var app = (0, express_1.default)();
var connection = mysql_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'login_test'
});
var PORT = 5000;
connection.connect(function (err) {
    if (err)
        throw err;
    console.log('データベースに接続されました');
});
app.use(express_1.default.static(path_1.default.join(__dirname, 'src')));
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, 'src', 'index.html'));
});
// POSTリクエストの処理
app.post('/login', function (req, res) {
    var login_id = req.body.login_id;
    var password = req.body.password;
    var query = "SELECT * FROM users WHERE login_id = ? AND password = ?";
    connection.query(query, [login_id, password], function (err, results) {
        if (err)
            throw err;
        if (results.length > 0) {
            res.send('ログイン成功');
        }
        else {
            res.send('ログイン失敗');
        }
    });
});
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
