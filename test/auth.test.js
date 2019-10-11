const supertest = require('supertest');
const assert = require('assert');
const express = require('express');
const chai = require('chai')
const bodyParser = require('body-parser');
const Sudoku = require('../services/sudoku/sudoku');
const Routes = require('../routes/sudoku_routes');
const Game_Score = require('../services/user/game-score');
const Sudoku_Api = require('../api/sudoku_api');
const User_Api = require('../api/user_api');
const Signup = require('../services/user/signup');
const Login = require('../services/user/login');
const config = require('../config/config')
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
    // this.timeout(10000)
    const signup = Signup(pool);
    const login = Login(pool);
    const sudoku = Sudoku();
    const game_score = Game_Score(pool);
    const user_api = User_Api(login, signup);
    const sudoku_api = Sudoku_Api(sudoku, game_score);
    Routes(app, sudoku_api, user_api)
    beforeEach(function () {
        config.testing = false;
    });
    describe('API security testing', function () {
    describe('Testing if API routes are protected', function () {
        it('Should respond with Forbidden as no user is logged in.', function (done) {
            supertest(app)
                .get('/api/new-game/easy')
                .end((err, res) => {
                    expect(res.text).to.be.deep.equal("Forbidden")
                    expect(403, done);
                    done();
                })
        });
    });
    describe('Testing user token authentication', function () {
        it('Should respond with no token', function (done) {
            supertest(app)
                .post('/verify')
                .end((err, res) => {
                    expect(res.body.status).to.be.deep.equal("No Token")
                    expect(200, done);
                    done();
                })
        })
    });
});
});