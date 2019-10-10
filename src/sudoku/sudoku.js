const checker = require('./checker')
const solver = require('./solver')
const sudoku_Solver = solver()
module.exports = () => {

    let row = 0;
    let col = 0;

    let grid = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],

        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],

        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    function generateNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function populateGrid() {
        for (var z = 0; z < 12; z++) {
            let number = generateNumber(0, 9)
            let row = generateNumber(0, 8)
            let col = generateNumber(0, 8)
            if (checker(grid, row, col, number)) {
                grid[row][col] = number
            }
        }
        return;
    }

    function intialBoard(level) {
        let rounds = 0;
        let mistakes_allowed = 0;
        resetG()
        populateGrid()
        if (sudoku_Solver.solve(grid, row, col) === "Retry") {
            intialBoard(level)
        } else {
            let answer = JSON.stringify(grid)
            if (level === "easy") rounds = 3, mistakes_allowed = 2
            if (level === "intermediate") rounds = 62, mistakes_allowed = 3
            if (level === "hard") rounds = 63, mistakes_allowed = 4
            if (level === "expert") rounds = 64, mistakes_allowed = 5
            for (var z = 0; z < rounds; z++) {
                let row = generateNumber(0, 8)
                let col = generateNumber(0, 8)
                if (grid[row][col] !== 0) {
                    grid[row][col] = 0;
                } else { z = z - 1 }
            }
            return [level,grid, JSON.parse(answer),mistakes_allowed]
        }
    }

    function resetG() {
        for (var row = 0; row < grid.length; row++) {
            for (var col = 0; col < grid.length; col++) {
                grid[row][col] = 0;
            }
        }
    }


    return {
        intialBoard,
        populateGrid,
        resetG
    }
}