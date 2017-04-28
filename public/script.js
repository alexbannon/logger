(function (window) {

  function Logger() {
    var self = this;
    this.level = {
      LOG: 'LOG',
      DEBUG: 'DEBUG',
      INFO: 'INFO',
      WARN: 'WARN',
      ERROR: 'ERROR',
      OFF: 'OFF'
    }
    var currentLevel = this.level.OFF;
    var consoleMessage = function(logType, messages) {
      if (currentLevel == self.level[logType]) {
        var consoleMethod = logType.toLowerCase();
        var finalMessage;
        if (console[consoleMethod]) {
          if (typeof messages === 'object') {
            finalMessage = messages.join(' ');
          } else {
            finalMessage = messages;
          }
          console[consoleMethod](finalMessage);
        }
      }
    }
    this.debug = function(...others) {
      consoleMessage('DEBUG', others)
    }
    this.info = function(...others) {
      consoleMessage('INFO', others)
    }
    this.warn = function(...others) {
      consoleMessage('WARN', others)
    }
    this.error = function(...others) {
      consoleMessage('ERROR', others)
    }
    this.log = function(...others) {
      consoleMessage('LOG', others)
    }
    this.clear = function() {
      console.clear();
    }
    this.getLevel = function() {
      return currentLevel;
    }
    this.setLevel = function(level) {
      logLevel = level.toUpperCase();
      if (this.level[logLevel] !== undefined) {
        currentLevel = this.level[logLevel];
      }
    }
    this.context = function(context) {
      function contextMethod(logLevel, context) {
        return function(...others) {
          self[logLevel](context, ...others)
        }
      }
      return {
        log: contextMethod('log', context),
        error: contextMethod('error', context),
        warn: contextMethod('warn', context),
        info: contextMethod('info', context),
        debug: contextMethod('debug', context),
      };
    }
  }

  window.logger = new Logger();
}(window));
