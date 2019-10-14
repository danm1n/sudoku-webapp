const express = require('express');

const bodyParser = require('body-parser');
const config = require('./config/config')
const app = express();
const session = require('express-session');
require('dotenv').config()
const pg = require("pg");
const Pool = pg.Pool;

const Sudoku = require('./services/sudoku/generate');
const Routes = require('./routes/sudoku_routes');
const Game_Score = require('./services/user/game-score');
const Sudoku_Api = require('./api/sudoku_api');
const User_Api = require('./api/user_api');
const Logger = require('./services/user/logger')

const Signup = require('./services/user/signup');
const Login = require('./services/user/login');
const Edit_User = require('./services/user/edit_user');

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
const edit_user = Edit_User(pool);
const logger = Logger(pool)

const sudoku = Sudoku();
const game_score = Game_Score(pool,logger);
const user_api = User_Api(login,signup,edit_user,logger);
const sudoku_api = Sudoku_Api(sudoku,game_score,logger);
Routes(app,sudoku_api,user_api)

let PORT = process.env.PORT || 4732;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});
