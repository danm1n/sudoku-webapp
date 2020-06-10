const supertest = require('supertest');
const express = require('express');
const chai = require('chai')
const bodyParser = require('body-parser');
const Sudoku = require('../services/sudoku/generate');
const Routes = require('../routes/sudoku_routes');
const Game_Score = require('../services/user/game-score');
const Sudoku_Api = require('../api/sudoku_api');
const User_Api = require('../api/user_api');
const Admin_Api = require('../api/admin_api');
const Logger = require('../services/user/logger');
const Signup = require('../services/user/signup');
const Login = require('../services/user/login');
const Edit_User = require('../services/user/edit_user');
const config = require('../config/config');
const pg = require("pg");

const Pool = pg.Pool;

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
const connectionString = process.env.DATABASE_URL || config.database;

const pool = new Pool({
    connectionString,
    ssl: useSSL
});
const expect = chai.expect
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

describe('------------------', function () {
    let highscoresTable;
    const signup = Signup(pool);
    const login = Login(pool);
    const sudoku = Sudoku();
    const logger = Logger(pool);
    const edit_user = Edit_User(pool);
    const admin_api = Admin_Api(logger);
    const game_score = Game_Score(pool,logger);
    const user_api = User_Api(login, signup,edit_user,logger);
    const sudoku_api = Sudoku_Api(sudoku, game_score,logger);
    Routes(app, sudoku_api, user_api,admin_api)
    beforeEach(async function () {
        config.testing = true;
        let table = await pool.query('SELECT username,highscore,level FROM users ORDER BY highscore DESC');
        highscoresTable = table.rows;
    });

    describe('Testing Sudoku game API', function () {
        it('Should respond with json file with a status of success and the sudoku puzzle in an array.', function (done) {
            supertest(app)
                .get('/api/game/classic/easy')
                .set('Accept', 'application/json, text/plain, */*')
                .end((err, res) => {
                    expect(res.body.status).to.be.deep.equal("success")
                    expect(res.body.grid.length).to.be.equal(9)
                    expect(200, done);
                })
                done();
        });
        it('Should send sudoku puzzle to server and return a [looks like your numbers clash]', function (done) {
            let form = {gamemode:"classic", grid: [[2, 3, 1, 4, 5, 7, 8, 6, 9], [4, 6, 7, 1, 9, 8, "1", "1", 3], [5, 8, 9, 2, 6, 3, 4, 7, 1], [1, 2, 3, 6, 4, 5, 7, 9, 8], [6, 9, 4, 8, 7, 1, 5, 3, 2], [7, 5, 8, 9, 3, 2, 1, 4, "1"], [9, 1, 6, 5, 8, 4, 3, 2, 7], [3, 4, 2, 7, 1, 9, 6, 8, 5], [8, 7, 5, 3, 2, 6, 9, 1, 4]],level:"easy" }
            supertest(app)
                .post('/api/check')
                .send(form)
                .set('Accept', 'application/json, text/plain, */*')
                .end((err, res) => {
                    console.log(res)
                    let response = res.body.data;
                    expect(response[0]).to.be.equal('Looks like your numbers clash.')
                    expect(200, done);
                })
                done();
        });
        it('Should send sudoku puzzle to server and return a [You won, well done!]', function (done) {
            let form = {gamemode:"classic", grid: [[2, 3, 1, 4, 5, 7, 8, 6, 9], [4, 6, 7, 1, 9, 8, "2", "5", 3], [5, 8, 9, 2, 6, 3, 4, 7, 1], [1, 2, 3, 6, 4, 5, 7, 9, 8], [6, 9, 4, 8, 7, 1, 5, 3, 2], [7, 5, 8, 9, 3, 2, 1, 4, "6"], [9, 1, 6, 5, 8, 4, 3, 2, 7], [3, 4, 2, 7, 1, 9, 6, 8, 5], [8, 7, 5, 3, 2, 6, 9, 1, 4]], level:"easy" }
            supertest(app)
                .post('/api/check')
                .send(form)
                .set('Accept', 'application/json, text/plain, */*')
                .end((err, res) => {
                    console.log(res)
                    let response = res.body.data;
                    expect(response[0]).to.be.equal('You won, well done!')
                    expect(200, done);
                })
                done();      
        });
    });
    describe('Testing User Highscore API', function () {
        it('Should return highscores of all users.', function (done) {
          
            supertest(app)
                .get('/api/users/highscore')
                .set('Accept', 'application/json, text/plain, */*')
                .end((err, res) => {
                    expect(res.body.data).to.be.deep.equal(
                        highscoresTable
                    )
                    expect(200, done);
                })
                done();
        });
    })
});