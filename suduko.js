function sudoku() {

    let array = [
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

    let num = 0;
    let random = 0;
    let a = 0;
    let b = 0;
    let c = 0;

    function generateNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function intialBoard(level) {
        console.log(`**${level}**`)

        let rounds = 0;
        if (level === "easy") rounds = 35
        if (level === "intermediate") rounds = 25
        if (level === "hard") rounds = 18
        if (level === "expert") rounds = 10

        for (var z = 0; z < rounds; z++) {
            let row = generateNumber(0, 8)
            let col = generateNumber(0, 8)
            // console.log(row)
            random = generateNumber(1, 9)
            if (checkGrid(row, col, random) === true) {
                a += 1
            } else {
                b += 1
                z = z - 1;
                // console.log(`${b} -rolling back 1`)
            }
        }
        // console.log("success:" + a, "|trying to replace:" + b, "-[total:" + (a) + "]")
        TESTING()
        // console.log("---------END-----------")
    }

    function checkGrid(row, col, random) {
        let array_x = array[row]
        let number = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        number = number.filter(function (val) {
            return array_x.indexOf(val) == -1;
        });
        let avaiblable_inBlock = checkBlock(row,col)
        number = number.filter(function (val) {
            return avaiblable_inBlock.indexOf(val) == -1;
        });
        // console.log(`avail :${number[k] === random}, number:${random} array:${number} index:${k}`)
      
        for (var z = 0; z < array_x.length; z++) {
            random = generateNumber(1, 9)
            if (array[row][col] === 0) {
                if (validate(number, random, col) === true) {
                    // console.log(`row:${row} random:${random}`)
                    array[row][col] = random   // making the random sudoku block equal to a random number after it passed all tests
                    return true;
                } else {
                    z = 0
                }
            } else {
                return false;
            }
        }
    }

    function validate(number, random, col) {
        for (var k = 0; k < number.length; k++) { //double checking if avaiblable number hasnt been used yet
            if (number[k] === random) {
                for(var k  = 0; k < array.length;k++){   //checking column
                    let columns = array[k][col]
                    if(columns === random){
                        // console.log('loc---> row/col:'+ k+"/"+col + ' number:'+random)
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
    }

    function checkBlock(row,col){
        if(col === 1 || col === 2) col = 0
        if(col === 4 || col === 5) col = 3
        if(col === 7 || col === 8) col = 6
        if(row === 1 || row === 2) row = 0
        if(row === 4 || row === 5) row = 3
        if(row === 7 || row === 8) row = 6
        // console.log(col)

        let block_1 = array[row][col]
        let block_2 = array[row][col+1]
        let block_3 = array[row][col+2]
        let block_4 = array[row+1][col]
        let block_5 = array[row+1][col+1]
        let block_6 = array[row+1][col+2]
        let block_7 = array[row+2][col]
        let block_8 = array[row+2][col+1]
        let block_9 = array[row+2][col+2]
        
        let block = [
                [block_1,block_2,block_3],
                [block_4,block_5,block_6],
                [block_7,block_8,block_9]
                    ]
                    // console.log(`col:${col} row:${row}`)
                    // console.log(block)

        return [block_1,block_2,block_3,block_4,block_5,block_6,block_7,block_8,block_9]
        
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