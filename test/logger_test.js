'use strict';
var expect = chai.expect;
var should = chai.should();
// Fake Test for Setup

describe('addition', function () {
  it('should add 1+1 correctly', function (done) {
    var onePlusOne = 1 + 1;
    onePlusOne.should.equal(2);
    done();
  });

  it('Should always return a boolean', function() {
    expect(isEven(2)).to.be.a('boolean');
  });

  it('Should return false when not even', function() {
    expect(isEven(3)).to.be.false
  })
});
