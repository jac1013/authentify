"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * We just need to extend this class and implement both methods
 * with whatever DB library we are using.
 */
var UserStorage = function () {
  function UserStorage() {
    (0, _classCallCheck3.default)(this, UserStorage);
  }

  (0, _createClass3.default)(UserStorage, [{
    key: "findOne",

    /**
     * This function receives an object with attributes specifying by what
     * fields we are going to search, the keys are the field in which we
     * want to search and the value of the object the value we want
     * to search: {field: 'fieldValue'}
     *
     * Depending on the library you are going to use you will have to transform
     * this criteria depending on your needs.
     * @param criteria
     */
    value: function findOne(criteria) {//eslint-disable-line
    }
  }, {
    key: "create",
    value: function create(attributes) {//eslint-disable-line
    }
  }]);
  return UserStorage;
}();

exports.default = UserStorage;
module.exports = exports["default"];