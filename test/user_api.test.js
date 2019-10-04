const supertest = require('supertest');
const assert = require('assert');
const express = require('express');
const chai = require('chai')
const bodyParser = require('body-parser');
const Sudoku = require('../src/sudoku/sudoku');
const Routes = require('../routes/sudoku_routes');
const Game_Score = require('../src/user/game-score');
const Sudoku_Api = require('../api/sudoku_api');
const User_Api = require('../api/user_api');
const Signup = require('../src/user/signup');
const Login = require('../src/user/login');
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

describe('----------------', function () {
    // this.timeout(10000)
    const signup = Signup(pool);
    const login = Login(pool);
    const sudoku = Sudoku();
    const game_score = Game_Score(pool);
    const user_api = User_Api(login, signup);
    const sudoku_api = Sudoku_Api(sudoku, game_score);
    Routes(app, sudoku_api, user_api)
    beforeEach(async function () {
        // await pool.query('truncate users');
    });

    describe('Testing User API', function () {

        it('Should return a status of 302 as /signup is a route', function (done) {
            supertest(app)
                .get('/signup')
                .end((err, res) => {
            expect(302,done);
            done();
                })
        });
        it('Should return a status of 302 as /login is a route', function (done) {
            supertest(app)
                .get('/login')
                .end((err, res) => {
            expect(302,done);
            done();
                })
        });

        it('Should respond with json file with a message that signup was successful', function (done) {
            const form = {
                inputName: "John",
                inputUsername: "Test Account",
                inputPassword: "12345",
                confirmPassword: "12345"
            }
            supertest(app)
                .post('/signup')
                .send(form)
                .set('Accept', 'application/json, text/plain, */*')
                .end((err, res) => {
                    expect('Content-Type', /json/)
                    expect(function (res) {
                        assert.deepEqual(res.body,
                            {
                                status: 'success',
                                createUser: true,
                                reason: 'User account created.'
                            }
                        )
                    })
                    expect(200, done);
                    done();
                })
        });

        it('Should respond with json file with a message that signup failed, as passwords do not match', function (done) {
            const form = {
                inputName: "John",
                inputUsername: "Test Account",
                inputPassword: "1234",
                confirmPassword: "12345"
            }
            supertest(app)
                .post('/signup')
                .send(form)
                .set('Accept', 'application/json, text/plain, */*')
                .end((err, res) => {
                    expect('Content-Type', /json/)
                    assert.deepEqual(res.body,
                        {
                            reason: "Passwords do not match.",
                            status: "faliure"
                        }
                    )
                })
            expect(200, done);
            done();
        });
        it('Should respond with json file with a message that signup failed, as username already exists', function (done) {
            const form = {
                inputName: "Ben",
                inputUsername: "Test Account",
                inputPassword: "12345",
                confirmPassword: "12345"
            }
            supertest(app)
                .post('/signup')
                .send(form)
                .set('Accept', 'application/json, text/plain, */*')
                .end((err, res) => {
                    expect('Content-Type', /json/)
                    assert.deepEqual(res.body,
                        {
                            status: 'faliure',
                            createUser: false,
                            reason: 'Username already exists.'
                        }
                    )
                })
            expect(200, done);
            done();
        });

        it('Should respond with json file with a message that login was successful, as username and password matched those in db', function (done) {
            const form = {
                inputUsername: "Test Account",
                inputPassword: "12345",
            }
            supertest(app)
                .post('/login')
                .send(form)
                .set('Accept', 'application/json, text/plain, */*')
                .end((err, res) => {
                    expect('Content-Type', /json/)
                    let response = Object.entries(res.body)
                    assert.deepEqual([response[0], response[1]],

                        [['status', 'success'], ['data', 'Token created']]
                    )
                })
            expect(200, done);
            done();
        });
        it('Should respond with json file with a message that login was unsuccessful, as username is incorrect', function (done) {
            const form = {
                inputUsername: "I dont exist",
                inputPassword: "12345",
            }
            supertest(app)
                .post('/login')
                .send(form)
                .set('Accept', 'application/json, text/plain, */*')
                .end((err, res) => {
                    expect('Content-Type', /json/)
                    let response = Object.entries(res.body)
                    assert.deepEqual([response[0], response[1]],
                        [['status', 'faliure'],
                        ['data', 'User does not exist.']]
                    )
                })
            expect(200, done);
            done();
        });
        it('Should respond with json file with a message that login was unsuccessful, as password is incorrect', function (done) {
            const form = {
                inputUsername: "Test Account",
                inputPassword: "1234",
            }
            supertest(app)
                .post('/login')
                .send(form)
                .set('Accept', 'application/json, text/plain, */*')
                .end((err, res) => {
                    expect('Content-Type', /json/)
                    let response = Object.entries(res.body)
                    assert.deepEqual([response[0], response[1]],
                        [['status', 'faliure'],
                        ['data', 'Password is incorrect.']]
                    )
                })
            expect(200, done);
            done();
        });
    });
});