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
    return this.value;
  }
}

export default PrimitiveValue;
