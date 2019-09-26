const express = require('express');

const bodyParser = require('body-parser');
const config = require('./config/config')
const app = express();
const session = require('express-session');
const pg = require("pg");
const Pool = pg.Pool;

const Sudoku = require('./src/sudoku/sudoku');
const ResetGrid = require('./src/sudoku/resetGrid')
const Routes = require('./routes/sudoku_routes');
const Sudoku_Api = require('./api/sudoku_api');
const User_Api = require('./api/user_api');

const Signup = require('./src/user/signup');
const Login = require('./src/user/login');

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}
const connectionString = process.env.DATABASE_URL || config.database;

const pool = new Pool({
  connectionString,
  ssl : useSSL
});

 app.use(session({
  secret : "12345",
  resave: false,
  saveUninitialized: true
}));

app.use(express.static('build'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const signup = Signup(pool);
const login = Login(pool);
const sudoku = Sudoku();
ResetGrid(sudoku)
const user_api = User_Api(login,signup);
const sudoku_api = Sudoku_Api(sudoku);
Routes(app,sudoku_api,user_api)

let PORT = process.env.PORT || 4732;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});
