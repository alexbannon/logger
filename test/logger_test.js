'use strict';
var expect = chai.expect;
var should = chai.should();

/* Necessary Functionality:
The logger should be exposed on the window object as window.logger
The logger should support getting and setting a log level via (logger.getLevel and logger.setLevel respectively).
The logger should have methods debug, info, warn, and error.
The log levels should be, correspondingly, logger.level.DEBUG, logger.level.INFO, logger.level.WARN, logger.level.ERROR, and logger.level.OFF.
If the logger is set to level logger.level.WARN and the info method is called, then the logger should do nothing.
However, if the warn method is called, the logger should call console.warn with the passed in arguments.

If error method is called, the logger should call console.error with the passed in arguments.
If set to the logger.level.OFF level, the logger should not log anything

The logger should default to the logger.level.OFF level.

The logger should have a context method, which accepts a string as an argument.
This method should return an object with methods debug, info, warn, and error
*/

describe('Logger', function() {
  it('should be available on the window object', function(done) {
    expect(window.logger).to.not.be.undefined
    done()
  });
  it('should support getting a log level', function(done) {
    expect(window.logger.getLevel()).to.not.be.undefined
    done()
  });
  it('should default to an off log level', function(done) {
    expect(window.logger.getLevel()).should.equal('OFF')
  })
  it('should support setting a log level', function(done) {
    var currentLevel = window.logger.getLevel();
    window.logger.setLevel('info');
    expect(window.logger.getLevel()).should.equal('INFO')
  })
})
