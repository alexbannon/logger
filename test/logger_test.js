'use strict';
var expect = chai.expect;
var should = chai.should();

/*
Done
The logger should be exposed on the window object as window.logger
The logger should support getting and setting a log level via (logger.getLevel and logger.setLevel respectively).
The logger should default to the logger.level.OFF level.
The logger should have methods debug, info, warn, and error.
The log levels should be, correspondingly, logger.level.DEBUG, logger.level.INFO, logger.level.WARN, logger.level.ERROR, and logger.level.OFF.

*/
/* Necessary Functionality:
If the logger is set to level logger.level.WARN and the info method is called, then the logger should do nothing.
However, if the warn method is called, the logger should call console.warn with the passed in arguments.

If error method is called, the logger should call console.error with the passed in arguments.
If set to the logger.level.OFF level, the logger should not log anything


The logger should have a context method, which accepts a string as an argument.
This method should return an object with methods debug, info, warn, and error
*/

function privateFunction (time) {
  if (time < 12) {
    console.error('Good morning');
  } else if (time >= 12 && time <19) {
    console.error('Good afternoon');
  } else { console.log('Good night!'); }
}

describe('Logger', function() {

  beforeEach(function() {
    window.sandbox = sinon.sandbox.create();

    var log = console.log;
    var error = console.error;
    window.sandbox.stub(console, 'log', function() {
      return log.apply(log, arguments);
    })
    window.sandbox.stub(console, 'error', function() {
      return error.apply(error, arguments);
    })
  });
  afterEach(function () {
    sandbox.restore();
  });

  it('should log "Good morning" for hours > 12', function() {
    privateFunction(5);
    expect( console.error.calledWith('Good morning') ).to.be.true;
  });

  it('should be available on the window object', function() {
    expect(window.logger).to.not.be.undefined
  });
  it('should not expose the object constructor to the window', function() {
    expect(window.Logger).to.be.undefined
  })
  it('should support getting a log level', function() {
    expect(window.logger.getLevel()).to.not.be.undefined
  });
  it('should default to an off log level', function() {
    expect(window.logger.getLevel()).to.equal('OFF')
    expect(window.logger.level.OFF).to.equal(true)
  })
  it('should support setting a log level', function() {
    var currentLevel = window.logger.getLevel();
    window.logger.setLevel('info');
    expect(window.logger.getLevel()).to.equal('INFO')
  })
  it('should support main method functionality', function() {
    expect(window.logger.debug).to.be.a('function')
    expect(window.logger.info).to.be.a('function')
    expect(window.logger.warn).to.be.a('function')
    expect(window.logger.error).to.be.a('function')
  })
})
