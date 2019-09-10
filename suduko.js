function sudoku() {

    let array = [
        [0, 0, 0, 0, 0, 2, 2, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],

        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],

        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    function generateNumber() {
        let random_Number = Math.floor(Math.random() * (8)) + 1;
        return random_Number
    }

    function intialBoard(level) {
        if (level === "easy") level = 35
        if (level === "intermediate") level = 25
        if (level === "hard") level = 18
        if (level === "expert") level = 10
        for (var z = 0; z < level; z++) {
            let row = generateNumber()
            let col = generateNumber()
            let random = generateNumber()
            if (checkBoard(row, col, random) === true) {
                array[row][col] = random
            }else{
                console.log('duplicate found')
            }
        }
        TESTING()
    }

    function checkBoard(row, col, random) {
        for (var z = 0; z < array[row].length; z++) {
            if (array[z][col] === random) {
                return false;
            }else{
                return true;
            }
        }
    }







    function TESTING() {
        for (var j = 0; j < array.length; j++) {
            console.log(array[j])
        }
    }


    return {
        intialBoard
    }
}