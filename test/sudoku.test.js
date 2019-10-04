const assert = require('assert');
const express = require('express');

const Sudoku = require('../src/sudoku/sudoku');
const Game_Score = require('../src/user/game-score');
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

const app = express();


describe('------------------', function () {
    const signup = Signup(pool);
    const login = Login(pool);
    const sudoku = Sudoku();
    const game_score = Game_Score(pool);
    describe('Testing Webapp Functions', function (){
   
    beforeEach(function () {
        config.testing = true;
    });

    describe('Testing Sudoku Game Generator', function () {
        it('Should return a random generated, game which difficulty is [easy], width 9 arrays/rows', function () {
            assert.deepEqual(sudoku.intialBoard('easy')[0].length, 9)
        });
        it('Should return a random generated, game which difficulty is [intermediate], width 9 arrays/rows', function () {
            assert.deepEqual(sudoku.intialBoard('intermediate')[0].length, 9)
        });
        it('Should return a random generated, game which difficulty is [hard], width 9 arrays/rows', function () {
            assert.deepEqual(sudoku.intialBoard('hard')[0].length, 9)
        });
        it('Should return a random generated, game which difficulty is [expert], width 9 arrays/rows', function () {
            assert.deepEqual(sudoku.intialBoard('expert')[0].length, 9)
        });
    });
    describe('Testing Sudoku Game Checker', function () {
    
    });
});
});
