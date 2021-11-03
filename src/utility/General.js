import _ from 'lodash';
import Observation from '../models/observation/Observation';
import moment from 'moment';

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

  //http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  static randomUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
  }
  static assignDateFields(dateFields, source, dest) {
    if (!_.isNil(dateFields)) {
      dateFields.forEach(fieldName => {
        dest[fieldName] = _.isNil(source[fieldName])
          ? null
          : new Date(source[fieldName]);
      });
    }
  }

  static assignFields(
    source,
    dest,
    directCopyFields,
    dateFields,
    observationFields = [],
    entityService,
  ) {
    if (!_.isNil(directCopyFields)) {
      directCopyFields.forEach(fieldName => {
        dest[fieldName] = source[fieldName];
      });
    }
    General.assignDateFields(dateFields, source, dest);
    General.assignObsFields(source, dest, observationFields, entityService);

    return dest;
  }

  static assignObsFields(source, dest, observationFields = [], entityService) {
    observationFields.forEach(observationField => {
      const observations = [];
      if (!_.isNil(source[observationField])) {
        _.toPairs(source[observationField]).forEach(([conceptUUID, value]) => {
          let observation = Observation.create();
          observation.concept = entityService.findByKey(
            'uuid',
            conceptUUID,
            'Concept', //Fix the cyclic dependency
          );
          observation.valueJSON = JSON.stringify(
            observation.concept.getValueWrapperFor(value),
          );
          observations.push(observation);
        });
      }
      dest[observationField] = observations;
    });

    return dest;
  }

  static pick(from, attributes, listAttributes) {
    const picked = _.pick(from, attributes);
    if (!_.isNil(listAttributes)) {
      listAttributes.forEach(listAttribute => {
        picked[listAttribute] = [...from[listAttribute]];
      });
    }
    return picked;
  }

  static toDisplayDate(date) {
    return _.isNil(date) ? '' : moment(date).format('DD-MMM-YYYY');
  }

  static toTwoChars(number) {
    return `${number}`.length === 1 ? `0${number}` : `${number}`;
  }

  static isoFormat(date) {
    return `${date.getFullYear()}-${General.toTwoChars(
      date.getMonth() + 1,
    )}-${General.toTwoChars(date.getDate())}`;
  }
}

export default General;
