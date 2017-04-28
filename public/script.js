(function (window) {

  function Logger() {
    this.level = {
      DEBUG: false,
      INFO: false,
      WARN: false,
      ERROR: false,
      OFF: true
    }
    this.debug = function() {

    }
    this.info = function() {

    }
    this.warn = function() {

    }
    this.error = function() {

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
