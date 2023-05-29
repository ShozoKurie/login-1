import express, { Request, Response } from 'express';
import path from 'path';
import mysql, { Connection, MysqlError } from 'mysql';

const app = express();
const connection: Connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'login_test'
});

const PORT: number = 5000;

connection.connect((err: MysqlError | null) => {
  if (err) throw err;
  console.log('データベースに接続されました');
});

app.use(express.static(path.join(__dirname, 'src')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});
// POSTリクエストの処理
app.post('/login', (req: Request, res: Response) => {
  const login_id: string = req.body.login_id;
  const password: string = req.body.password;

  const query: string = `SELECT * FROM users WHERE login_id = ? AND password = ?`;
  connection.query(query, [login_id, password], (err: MysqlError | null, results: any[]) => {
    if (err) throw err;

    if (results.length > 0) {
      res.send('ログイン成功');
    } else {
      res.send('ログイン失敗');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
