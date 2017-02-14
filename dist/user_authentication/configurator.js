'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Configurator = function () {
  function Configurator() {
    (0, _classCallCheck3.default)(this, Configurator);
    this.additionalAttributes = {};

    return {
      setEmail: this.setEmail,
      validateEmail: this.validateEmail,
      setPassword: this.setPassword,
      validatePassword: this.validatePassword,
      setUserStorage: this.setUserStorage,
      setAdditionalAttributes: this.setAdditionalAttributes,
      setUsername: this.setUsername,
      validateUsername: this.validateUsername,
      additionalAttributes: {}
    };
  }

  (0, _createClass3.default)(Configurator, [{
    key: 'setEmail',
    value: function setEmail(email, validationRegex) {
      this.email = email;
      this.validateEmail(validationRegex);
      return this;
    }
  }, {
    key: 'validateEmail',
    value: function validateEmail(emailRegex) {
      emailRegex = emailRegex || /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line
      if (this.email && !emailRegex.test(this.email)) {
        throw new InvalidEmailException();
      }
      return true;
    }
  }, {
    key: 'setPassword',
    value: function setPassword(password) {
      this.password = password;
      this.validatePassword();
      return this;
    }
  }, {
    key: 'validatePassword',
    value: function validatePassword(passwordRegex) {
      passwordRegex = passwordRegex || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (!passwordRegex.test(this.password)) {
        throw new InvalidPasswordException();
      }
      return true;
    }
  }, {
    key: 'setUserStorage',
    value: function setUserStorage(userStorage) {
      this.userStorage = userStorage;
      return this;
    }
  }, {
    key: 'setAdditionalAttributes',
    value: function setAdditionalAttributes(attributes) {
      this.additionalAttributes = attributes;
      return this;
    }
  }, {
    key: 'setUsername',
    value: function setUsername(username) {
      this.username = username;
      return this;
    }
  }], [{
    key: 'isConfiguratorException',
    value: function isConfiguratorException(exception) {
      return exception instanceof InvalidEmailException || exception instanceof InvalidPasswordException;
    }
  }]);
  return Configurator;
}();

var InvalidEmailException = function InvalidEmailException() {
  (0, _classCallCheck3.default)(this, InvalidEmailException);
  this.message = 'The email is not valid.';
};

var InvalidPasswordException = function InvalidPasswordException() {
  (0, _classCallCheck3.default)(this, InvalidPasswordException);
  this.message = 'The password must contains Minimum 8 characters ' + 'at least 1 Uppercase Alphabet, 1 Lowercase Alphabet and 1 Number.';
};

exports.default = Configurator;
module.exports = exports['default'];