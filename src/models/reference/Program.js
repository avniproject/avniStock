import _ from 'lodash';
import Realm from 'realm';

class Program extends Realm.Object {
  static fromResource(operationalProgram): Program {
    return {
      uuid: operationalProgram.programUUID,
      name: operationalProgram.programName,
      operationalProgramName: operationalProgram.name,
      colour: _.isNil(operationalProgram.colour)
        ? Program.randomColour()
        : operationalProgram.colour,
      displayName: _.isEmpty(operationalProgram.name)
        ? operationalProgram.programName
        : operationalProgram.name,
      programSubjectLabel:
        operationalProgram.programSubjectLabel ||
        operationalProgram.name ||
        operationalProgram.programName,
      voided: operationalProgram.programVoided,
    };
  }

  static randomColour() {
    return (
      'rgb(' +
      Math.floor(Math.random() * 256) +
      ',' +
      Math.floor(Math.random() * 256) +
      ',' +
      Math.floor(Math.random() * 256) +
      ')'
    );
  }

  clone() {
    const program = this.toJSON();
    return _.clone(program);
  }
}

Program.schema = {
  name: 'Program',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    name: 'string',
    operationalProgramName: {type: 'string', optional: true},
    displayName: 'string',
    colour: 'string',
    programSubjectLabel: 'string',
    voided: {type: 'bool', default: false},
  },
};

export default Program;
