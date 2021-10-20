import Concept from '../reference/Concept';
import _ from 'lodash';
import moment from 'moment';

class PrimitiveValue {
  constructor(value, datatype) {
    this.value = value;
    this.datatype = datatype;
    this.answer = this._valueFromString();
  }

  getValue() {
    return this.answer;
  }

  get toResource() {
    return this.answer;
  }

  cloneForEdit() {
    return new PrimitiveValue(this.value, this.datatype);
  }

  _valueFromString() {
    if (this.datatype === Concept.dataType.Numeric) {
      return _.isNaN(_.toNumber(this.value)) ? 0 : _.floor(this.value);
    } else if (this.datatype === Concept.dataType.Date) {
      const date = new Date(Date.parse(this.value));
      return moment(date).startOf('day').toDate();
    }

    return this.value;
  }
}

export default PrimitiveValue;
