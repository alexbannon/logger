(function (window) {

  function Logger() {
    var self = this;
    this.level = {
      LOG: false,
      DEBUG: false,
      INFO: false,
      WARN: false,
      ERROR: false,
      OFF: true
    }
    var consoleMessage = function(logType, message) {
      if (self.level[logType]) {
        var consoleMethod = logType.toLowerCase();
        if (console[consoleMethod]) {
          console[consoleMethod](message);
        }
      }
    }
    this.debug = function(message) {
      consoleMessage('DEBUG', message)
    }
    this.info = function(message) {
      consoleMessage('INFO', message)
    }
    this.warn = function(message) {
      consoleMessage('WARN', message)
    }
    this.error = function(message) {
      consoleMessage('ERROR', message)
    }
    this.log = function(message) {
      consoleMessage('LOG', message)
    }
    this.getLevel = function() {
      for (var key in this.level) {
        if (this.level.hasOwnProperty(key)) {
          if (this.level[key] === true) {
            return key
          }
        }
      }
    }
    this.setLevel = function(level) {
      logLevel = level.toUpperCase();
      if (this.level[logLevel] !== undefined) {
        for (var key in this.level) {
          if (this.level.hasOwnProperty(key)) {
            if (key == logLevel) {
              this.level[key] = true
            } else {
              this.level[key] = false
            }
          }
        }
      }
    }
  }

  window.logger = new Logger();
}(window));
