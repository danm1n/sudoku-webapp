const assert = require('assert');
const express = require('express');

const Sudoku = require('../services/sudoku/generate');
const Game_Score = require('../services/user/game-score');
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

describe('------------------', function () {
    describe('Testing Webapp Functions', function (){
   
    beforeEach(function () {
        config.testing = true;
    });

    describe('Testing Sudoku Game Generator', function () {
        it('Should return a random generated, game which difficulty is [easy], width 9 arrays/rows', function () {
            const sudoku = Sudoku();
            let puzzle = sudoku.intialBoard('easy')
            assert.deepEqual(puzzle[1].length, 9)
        });
        it('Should return a random generated, game which difficulty is [intermediate], width 9 arrays/rows', function () {
            const sudoku = Sudoku();
            let puzzle = sudoku.intialBoard('intermediate')
            assert.deepEqual(puzzle[1].length, 9)
        });
        it('Should return a random generated, game which difficulty is [hard], width 9 arrays/rows', function () {
            const sudoku = Sudoku();
            let puzzle = sudoku.intialBoard('hard')
            assert.deepEqual(puzzle[1].length, 9)
        });
        it('Should return a random generated, game which difficulty is [expert], width 9 arrays/rows', function () {
            const sudoku = Sudoku();
            let puzzle = sudoku.intialBoard('expert')
            assert.deepEqual(puzzle[1].length, 9)
        });
    });
});
});
