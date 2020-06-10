const assert = require('assert');

const Sudoku = require('../services/sudoku/generate');
const config = require('../config/config')

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

describe('------------------', function () {
    describe('Testing Webapp Functions', function (){
   
    beforeEach(function () {
        config.testing = true;
    });

    describe('Testing Sudoku Game Generator', function () {
        it('Should return a random generated, game which difficulty is [easy], width 9 arrays', function () {
            const sudoku = Sudoku();
            let puzzle = sudoku.intialBoard('easy')
            assert.equal(puzzle[1].length, 9)
        });
        it('Should return a random generated, game which difficulty is [intermediate], width 9 arrays', function () {
            const sudoku = Sudoku();
            let puzzle = sudoku.intialBoard('intermediate')
            assert.equal(puzzle[1].length, 9)
        });
        it('Should return a random generated, game which difficulty is [hard], width 9 arrays', function () {
            const sudoku = Sudoku();
            let puzzle = sudoku.intialBoard('hard')
            assert.equal(puzzle[1].length, 9)
        });
        it('Should return a random generated, game which difficulty is [expert], width 9 arrays', function () {
            const sudoku = Sudoku();
            let puzzle = sudoku.intialBoard('expert')
            assert.equal(puzzle[1].length, 9)
        });
    });
});
});
