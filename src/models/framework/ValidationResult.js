class ValidationResult {
  constructor(success, formIdentifier, messageKey, extra) {
    this.success = success;
    this.formIdentifier = formIdentifier;
    this.messageKey = messageKey;
    this.extra = extra;
  }

  static successful(formIdentifier) {
    return new ValidationResult(true, formIdentifier);
  }

  static failureForEmpty(formIdentifier) {
    return new ValidationResult(false, formIdentifier, "Field can't be empty.");
  }

  static failureForUnique(formIdentifier) {
    return new ValidationResult(
      false,
      formIdentifier,
      'This field must be unique.',
    );
  }

  static failureForFutureDate(formIdentifier) {
    return new ValidationResult(
      false,
      formIdentifier,
      "Date can't be in future.",
    );
  }

  static failure(formIdentifier, messageKey, extra) {
    return new ValidationResult(false, formIdentifier, messageKey, extra);
  }

  //static because validation result could be created by the rules which would not be using this class
  static clone(validationResult) {
    return new ValidationResult(
      validationResult.success,
      validationResult.formIdentifier,
      validationResult.messageKey,
      validationResult.extra,
    );
  }
}

export default ValidationResult;
