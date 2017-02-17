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

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _configurator = require('./configurator');

var _configurator2 = _interopRequireDefault(_configurator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EmailAlreadyExistException = function EmailAlreadyExistException() {
  (0, _classCallCheck3.default)(this, EmailAlreadyExistException);
  this.message = 'The email is already chosen.';
};

var UsernameAlreadyExistException = function UsernameAlreadyExistException() {
  (0, _classCallCheck3.default)(this, UsernameAlreadyExistException);
  this.message = 'The username is already chosen.';
};

var Registerer = function () {
  function Registerer() {
    (0, _classCallCheck3.default)(this, Registerer);

    (0, _assign2.default)(this, new _configurator2.default());
    this.hashLibrary = _bcrypt2.default;
  }

  (0, _createClass3.default)(Registerer, [{
    key: 'register',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var hashedPassword;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.checkDuplicatedEmail();

              case 2:
                _context.next = 4;
                return this.checkDuplicatedUsername();

              case 4:
                _context.next = 6;
                return this.hashPassword();

              case 6:
                hashedPassword = _context.sent;
                return _context.abrupt('return', this.userStorage.create(this.mergeExtraAttributes(hashedPassword)).then(Registerer.deletePassword));

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function register() {
        return _ref.apply(this, arguments);
      }

      return register;
    }()
  }, {
    key: 'checkDuplicatedEmail',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var user;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.findUser({ email: this.email });

              case 2:
                user = _context2.sent;

                if (!user) {
                  _context2.next = 5;
                  break;
                }

                throw new EmailAlreadyExistException();

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function checkDuplicatedEmail() {
        return _ref2.apply(this, arguments);
      }

      return checkDuplicatedEmail;
    }()
  }, {
    key: 'findUser',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(criteria) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.checkUserStorageToBeSet();
                _context3.next = 3;
                return this.userStorage.findOne(criteria);

              case 3:
                return _context3.abrupt('return', _context3.sent);

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function findUser(_x) {
        return _ref3.apply(this, arguments);
      }

      return findUser;
    }()
  }, {
    key: 'checkDuplicatedUsername',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        var user;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.findUser({ username: this.username });

              case 2:
                user = _context4.sent;

                if (!user) {
                  _context4.next = 5;
                  break;
                }

                throw new UsernameAlreadyExistException();

              case 5:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function checkDuplicatedUsername() {
        return _ref4.apply(this, arguments);
      }

      return checkDuplicatedUsername;
    }()
  }, {
    key: 'hashPassword',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt('return', this.hashLibrary.hash(this.password, 5));

              case 1:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function hashPassword() {
        return _ref5.apply(this, arguments);
      }

      return hashPassword;
    }()
  }, {
    key: 'mergeExtraAttributes',
    value: function mergeExtraAttributes(hashedPassword) {
      return (0, _assign2.default)(this.additionalAttributes, {
        email: this.email,
        password: hashedPassword,
        username: this.username
      });
    }
  }], [{
    key: 'deletePassword',
    value: function deletePassword(user) {
      user.password = undefined;
      return user;
    }
  }, {
    key: 'isRegisterException',
    value: function isRegisterException(exception) {
      return this.isEmailAlreadyExistException(exception) || this.isUsernameAlreadyExistException(exception) || _configurator2.default.isConfiguratorException(exception);
    }
  }, {
    key: 'isEmailAlreadyExistException',
    value: function isEmailAlreadyExistException(exception) {
      return exception instanceof EmailAlreadyExistException;
    }
  }, {
    key: 'isUsernameAlreadyExistException',
    value: function isUsernameAlreadyExistException(exception) {
      return exception instanceof UsernameAlreadyExistException;
    }
  }]);
  return Registerer;
}();

exports.default = Registerer;
module.exports = exports['default'];