
  describe('Testing different levels', function () {
  it('Should give me 35 numbers as the level is easy. ', function () {
    let instance = sudoku()
   instance.intialBoard("easy")
   console.log("--------------------")
  });

  it('Should give me 25 numbers as level is intermediate. ', function () {
    let instance = sudoku()
    instance.intialBoard("intermediate")
  });

  it('Should give me 18 numbers as level is hard. ', function () {
    let instance = sudoku()
    instance.intialBoard("hard")
  });

  it('Should give me 10 numbers as level is expert. ', function () {
    let instance = sudoku()
    instance.intialBoard("expert")
  });
})
