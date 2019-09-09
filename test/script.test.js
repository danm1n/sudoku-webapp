describe('Ice Cream', function () {


  it('Should not count the same name, in this case Daniel is counted once.', function () {
    let instance = ice_cream()
   instance.makeCombo()
   instance.runme()

    assert.equal(testinstance.count(), 2);
  });


  });
