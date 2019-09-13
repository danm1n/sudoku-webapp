const express = require('express');

const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const pg = require("pg");
const Pool = pg.Pool;

const Sudoku = require('./src/sudoku/generate');
const Routes = require('./routes/sudoku_routes');
const Sudoku_Api = require('./api/sudoku_api');

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:mint1213@localhost:5432/greetings';

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

const sudoku = Sudoku()
const sudoku_api = Sudoku_Api(sudoku)
Routes(app,sudoku_api)

let PORT = process.env.PORT || 4732;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});
