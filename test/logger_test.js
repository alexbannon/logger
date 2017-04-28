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
If the logger is set to level logger.level.WARN and the info method is called, then the logger should do nothing.
However, if the warn method is called, the logger should call console.warn with the passed in arguments.
If error method is called, the logger should call console.error with the passed in arguments.

*/
/* Necessary Functionality:
handle multiple arguments
If set to the logger.level.OFF level, the logger should not log anything


The logger should have a context method, which accepts a string as an argument.
This method should return an object with methods debug, info, warn, and error
*/

describe('Logger', function() {

  beforeEach(function() {
    window.sandbox = sinon.sandbox.create();

    var log = console.log;
    var error = console.error;
    var warn = console.warn;
    var info = console.info;
    var debug = console.debug;
    window.sandbox.stub(console, 'log', function() {
      return log.apply(log, arguments);
    })
    window.sandbox.stub(console, 'error', function() {
      return error.apply(error, arguments);
    })
    window.sandbox.stub(console, 'warn', function() {
      return warn.apply(warn, arguments);
    })
    window.sandbox.stub(console, 'info', function() {
      return info.apply(info, arguments);
    })
    window.sandbox.stub(console, 'debug', function() {
      return debug.apply(debug, arguments);
    })
  });
  afterEach(function () {
    sandbox.restore();
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
  it('should have main methods that exist', function() {
    expect(window.logger.debug).to.be.a('function')
    expect(window.logger.info).to.be.a('function')
    expect(window.logger.warn).to.be.a('function')
    expect(window.logger.error).to.be.a('function')
    expect(window.logger.log).to.be.a('function')
  })
  it('should not fire method if log level is different from method', function() {
    window.logger.setLevel('warn');
    window.logger.info('Hello World');
    expect( console.info.calledWith('Hello World') ).to.be.false;
  })
  it('should fire a message for each log type', function() {
    window.logger.setLevel('log');
    window.logger.log('Hello World');
    expect( console.log.calledWith('Hello World') ).to.be.true;
    window.logger.setLevel('debug');
    window.logger.debug('Hello World');
    expect( console.debug.calledWith('Hello World') ).to.be.true;
    window.logger.setLevel('info');
    window.logger.info('Hello World');
    expect( console.info.calledWith('Hello World') ).to.be.true;
    window.logger.setLevel('warn');
    window.logger.warn('Hello World');
    expect( console.warn.calledWith('Hello World') ).to.be.true;
    window.logger.setLevel('error');
    window.logger.error('Hello World');
    expect( console.error.calledWith('Hello World') ).to.be.true;
  })
  it('should fire no type of message, regardless of how many times the logger level has changed, once it is set to off', function() {
    window.logger.setLevel('log');
    window.logger.setLevel('debug');
    window.logger.setLevel('log');
    window.logger.setLevel('info');
    window.logger.setLevel('warn');
    window.logger.setLevel('error');
    window.logger.setLevel('off');

    window.logger.log('Hello World');
    expect( console.log.calledWith('Hello World') ).to.be.false;
    window.logger.debug('Hello World');
    expect( console.debug.calledWith('Hello World') ).to.be.false;
    window.logger.info('Hello World');
    expect( console.info.calledWith('Hello World') ).to.be.false;
    window.logger.warn('Hello World');
    expect( console.warn.calledWith('Hello World') ).to.be.false;
    window.logger.error('Hello World');
    expect( console.error.calledWith('Hello World') ).to.be.false;
  })
})
