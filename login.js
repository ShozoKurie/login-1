const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'login_test'
  });
  

const PORT = 5000; // 使用するポート番号
connection.connect((err) => {
    if (err) throw err;
    console.log('データベースに接続されました');
  });

// 静的ファイルの提供
app.use(express.static(path.join(__dirname, 'src')));

// Body Parser ミドルウェアの設定
app.use(express.urlencoded({ extended: true }));

// ルートへのリクエストに対する応答
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// POSTリクエストの処理
app.post('/login', (req, res) => {
  const login_id = req.body.login_id;
  const password = req.body.password;

  // ここでユーザーの認証やデータベースとの照合を行います

 // データベースクエリの実行
 const query = `SELECT * FROM users WHERE login_id = ? AND password = ?`;
 connection.query(query, [login_id, password], (err, results) => {
   if (err) throw err;

   // ログイン判定
   if (results.length > 0) {
     res.send('ログイン成功'); // ログイン成功の場合の処理
   } else {
     res.send('ログイン失敗'); // ログイン失敗の場合の処理
   }
 });
});;

// サーバーの起動
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
