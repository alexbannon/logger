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
    this.currentLevel = this.level.OFF;
    var consoleMessage = function(logType, messages) {
      if (self.currentLevel == self.level[logType]) {
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
    this.getLevel = function() {
      return this.currentLevel;
    }
    this.setLevel = function(level) {
      logLevel = level.toUpperCase();
      if (this.level[logLevel] !== undefined) {
        this.currentLevel = this.level[logLevel];
      }
    }
    this.context = function(context) {
      function contextMethod(logLevel, context) {
        return function(message) {
          self[logLevel](context, message)
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
