import _ from 'lodash';

var currentLogLevel;

class General {
  static LogLevel = {
    Error: 4,
    Warn: 3,
    Info: 2,
    Debug: 1,
  };

  static setCurrentLogLevel(level) {
    currentLogLevel = level;
  }

  static look(stuffToPrint) {
    General.logDebug('General', stuffToPrint);
    return stuffToPrint;
  }

  static getCurrentLogLevel() {
    return currentLogLevel;
  }

  static canLog(level) {
    return General.getCurrentLogLevel() <= level;
  }

  static logDebug(source, message) {
    General.log(source, message, General.LogLevel.Debug);
  }

  static logInfo(source, message) {
    General.log(source, message, General.LogLevel.Info);
  }

  static logWarn(source, message) {
    General.log(source, message, General.LogLevel.Warn);
  }

  static logError(source, error) {
    if (General.LogLevel.Error >= General.getCurrentLogLevel()) {
      console.error(source, `${error.message}, ${JSON.stringify(error)}`);
    }
  }

  static logErrorAsInfo(source, error) {
    if (General.LogLevel.Error >= General.getCurrentLogLevel()) {
      console.log(`[${source}]`, error.message, JSON.stringify(error));
    }
  }

  static log(source, message, level) {
    try {
      let levelName = `${_.findKey(
        General.LogLevel,
        value => value === level,
      )}`;
      let logMessage = `[${source}][${levelName}] ${General.getDisplayableMessage(
        message,
      )}`;
      if (level >= General.getCurrentLogLevel()) {
        console[levelName.toLowerCase()](logMessage);
      }
    } catch (e) {
      console.error(
        'General',
        `Logger failed for : 'General.log("${source}",....)' with error: "${e.message}"`,
        level,
      );
    }
  }

  static getDisplayableMessage(obj) {
    if (obj && obj instanceof Error) {
      return obj.message;
    }
    if (typeof obj === 'object') {
      let s = JSON.stringify(obj);
      if (s === '{}') {
        return obj;
      }
      return s;
    }
    return obj;
  }
}

export default General;
