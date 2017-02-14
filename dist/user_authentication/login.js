'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _configurator = require('./configurator');

var _configurator2 = _interopRequireDefault(_configurator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Login = function () {
  function Login() {
    (0, _classCallCheck3.default)(this, Login);

    (0, _assign2.default)(this, new _configurator2.default());
    this.hashLibrary = _bcrypt2.default;
  }

  (0, _createClass3.default)(Login, [{
    key: 'authenticate',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.findByEmailOrUsername();

              case 2:
                this.isUserNotFound();
                _context.next = 5;
                return this.isPasswordIncorrect();

              case 5:
                this.user.password = undefined;
                return _context.abrupt('return', this.user);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function authenticate() {
        return _ref.apply(this, arguments);
      }

      return authenticate;
    }()
  }, {
    key: 'findByEmailOrUsername',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.findByEmail();

              case 2:
                _context2.next = 4;
                return this.findByUsername();

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function findByEmailOrUsername() {
        return _ref2.apply(this, arguments);
      }

      return findByEmailOrUsername;
    }()
  }, {
    key: 'findByEmail',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.email) {
                  _context3.next = 4;
                  break;
                }

                _context3.next = 3;
                return this.userStorage.findOne({ email: this.email });

              case 3:
                this.user = _context3.sent;

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function findByEmail() {
        return _ref3.apply(this, arguments);
      }

      return findByEmail;
    }()
  }, {
    key: 'findByUsername',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(this.username && !this.user)) {
                  _context4.next = 4;
                  break;
                }

                _context4.next = 3;
                return this.userStorage.findOne({ username: this.username });

              case 3:
                this.user = _context4.sent;

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function findByUsername() {
        return _ref4.apply(this, arguments);
      }

      return findByUsername;
    }()
  }, {
    key: 'isUserNotFound',
    value: function isUserNotFound() {
      if (!this.user) {
        Login.throwWrongCredentials();
      }
    }
  }, {
    key: 'isPasswordIncorrect',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
        var isPasswordCorrect;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.hashLibrary.compare(this.password, this.user.password);

              case 2:
                isPasswordCorrect = _context5.sent;

                if (!isPasswordCorrect) {
                  Login.throwWrongCredentials();
                }

              case 4:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function isPasswordIncorrect() {
        return _ref5.apply(this, arguments);
      }

      return isPasswordIncorrect;
    }()
  }], [{
    key: 'throwWrongCredentials',
    value: function throwWrongCredentials() {
      throw new UnauthorizedException();
    }
  }, {
    key: 'isLoginException',
    value: function isLoginException(exception) {
      return exception instanceof UnauthorizedException || _configurator2.default.isConfiguratorException(exception);
    }
  }]);
  return Login;
}();

var UnauthorizedException = function UnauthorizedException() {
  (0, _classCallCheck3.default)(this, UnauthorizedException);
  this.WRONG_EMAIL_OR_PASSWORD = 'Wrong Credentials, verify them and try again.';

  this.message = this.WRONG_EMAIL_OR_PASSWORD;
};

exports.default = Login;
module.exports = exports['default'];