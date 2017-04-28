'use strict';
var expect = chai.expect;
var should = chai.should();

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
    expect(window.logger.getLevel()).to.equal(window.logger.level.OFF)
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
    expect( console.log.calledWith('Hello World')).to.be.false;
    window.logger.debug('Hello World');
    expect( console.debug.calledWith('Hello World')).to.be.false;
    window.logger.info('Hello World');
    expect( console.info.calledWith('Hello World')).to.be.false;
    window.logger.warn('Hello World');
    expect( console.warn.calledWith('Hello World')).to.be.false;
    window.logger.error('Hello World');
    expect( console.error.calledWith('Hello World')).to.be.false;
  })
  it('should be able to log to the console using multiple arguments', function() {
    window.logger.setLevel('log');
    window.logger.log('Hello', 'World.', 'How', 'Are', 'You', 'Today?');
    expect( console.log.calledWith('Hello World. How Are You Today?')).to.be.true;
  })
  it('should have a context method that returns an object', function() {
    var loggerWithContext = logger.context('with context');
    expect(loggerWithContext).to.be.an('object');
  })
  it('should have methods available on the context object', function() {
    var loggerWithContext = logger.context('with context');
    expect(loggerWithContext.debug).to.be.a('function')
    expect(loggerWithContext.info).to.be.a('function')
    expect(loggerWithContext.warn).to.be.a('function')
    expect(loggerWithContext.error).to.be.a('function')
    expect(loggerWithContext.log).to.be.a('function')
  })
  it('should remember the context and log level in the context object', function() {
    window.logger.setLevel('log');
    var loggerWithContext = logger.context('with context');
    loggerWithContext.error('HELLO');
    expect( console.error.calledWith('Hello World')).to.be.false;
    loggerWithContext.log('hello');
    expect( console.log.calledWith('with context hello')).to.be.true;
  })
})
