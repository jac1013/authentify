class Configurator {
  email;
  password;
  userStorage;
  additionalAttributes = {};
  username;

  constructor() {
    return {
      setEmail: this.setEmail,
      validateEmail: this.validateEmail,
      setPassword: this.setPassword,
      validatePassword: this.validatePassword,
      setUserStorage: this.setUserStorage,
      setAdditionalAttributes: this.setAdditionalAttributes,
      setUsername: this.setUsername,
      validateUsername: this.validateUsername,
      additionalAttributes: {},
    };
  }

  setEmail(email, validationRegex) {
    this.email = email;
    this.validateEmail(validationRegex);
    return this;
  }

  validateEmail(emailRegex) {
    emailRegex = emailRegex || /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line
    if (this.email && !emailRegex.test(this.email)) {
      throw new InvalidEmailException();
    }
    return true;
  }

  setPassword(password) {
    this.password = password;
    this.validatePassword();
    return this;
  }

  validatePassword(passwordRegex) {
    passwordRegex = passwordRegex || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(this.password)) {
      throw new InvalidPasswordException();
    }
    return true;
  }

  setUserStorage(userStorage) {
    this.userStorage = userStorage;
    return this;
  }

  setAdditionalAttributes(attributes) {
    this.additionalAttributes = attributes;
    return this;
  }

  setUsername(username) {
    this.username = username;
    return this;
  }

  static isConfiguratorException(exception) {
    return exception instanceof InvalidEmailException
      || exception instanceof InvalidPasswordException;
  }
}

class InvalidEmailException {
  message = 'The email is not valid.';
}

class InvalidPasswordException {
  message = 'The password must contains Minimum 8 characters ' +
    'at least 1 Uppercase Alphabet, 1 Lowercase Alphabet and 1 Number.';
}

export default Configurator;
