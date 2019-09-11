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

    function generateNumber(min,max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function intialBoard(level) {
        console.log(`**${level}**`)
        let a = 0;
        let b = 0;
        let rounds = 0;
        if (level === "easy") rounds = 35
        if (level === "intermediate") rounds = 25
        if (level === "hard") rounds = 18
        if (level === "expert") rounds = 10

        for (var z = 0; z < rounds; z++) {
            let row = generateNumber(0,8)
            let col = generateNumber(0,8)
            // console.log(row)
            let random = generateNumber(1,9)
            if (checkRow(row,random) === true) {
                a += 1
                array[row][col] = random
            } else { b += 1 }
        }

        console.log("success:" + a, "|duplicates:" + b, "|total:" + (a + b))
        TESTING()
        console.log("---------END-----------")
    }

    function checkRow(row,random) {
        // console.log(random)
        let available = 0;
        let array_x = array[row]
        let number = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        number = number.filter(function (val) {
            return array_x.indexOf(val) == -1;
        });
        // console.log(number)
        // console.log(`sorted:${number}||row:${row}`)
        for(var k = 0; k <number.length;k++){
            // console.log(k)
            // console.log(`avail :${number[k] === random}, number:${random} array:${number} index:${k}`)
            if(number[k] === random){
                available = random;
                break;
            }else{
               random = generateNumber(1,9)
               k=0
             }
        }
// console.log(add)
        // num = number[generateNumber(number.length - 1)]
        for (var z = 0; z < array_x.length; z++) {
            // console.log("_________________________")
            // console.log(array_x[3])
            // console.log(available + " avail")
            // console.log(array_x[z] === available)
            // console.log("_________________________")
            console.log(`value:${array_x[z]}, number:${available}`)
            if (array_x[z] === available){
                console.log('duplicate')
                return false;
            }
        }
        console.log("///////////////////////////////")
        return true;
    }


    function checkColumn(col) {
        for (var k = 0; k < array.length; k++) {
            let columns = array[k][col]
            if (columns === num) {
                console.log('loc---> row/col:' + k + "/" + col + ' number:' + num)
                return false;
            }
        }
        return true;
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