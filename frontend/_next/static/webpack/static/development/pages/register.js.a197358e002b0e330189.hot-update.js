webpackHotUpdate("static\\development\\pages\\register.js",{

/***/ "./pages/register.js":
/*!***************************!*\
  !*** ./pages/register.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-apollo */ "./node_modules/react-apollo/react-apollo.browser.umd.js");
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_apollo__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! graphql-tag */ "./node_modules/graphql-tag/src/index.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/App */ "./components/App.jsx");
/* harmony import */ var _components_Loading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Loading */ "./components/Loading.jsx");
/* harmony import */ var _lib_withData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/withData */ "./lib/withData.js");
/* harmony import */ var _containers_Register__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../containers/Register */ "./containers/Register.jsx");
/* harmony import */ var _containers_Subscribe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../containers/Subscribe */ "./containers/Subscribe.jsx");
function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    mutation Register($input: RegisterInput) {\n        Register(input: $input) {\n            token\n        }\n    }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    mutation Subscribe($input: SubscribeInput) {\n        Subscribe(input: $input) {\n            message\n        }\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }









var SUBSCRIBE_MUTATION = graphql_tag__WEBPACK_IMPORTED_MODULE_2___default()(_templateObject());

var RegisterPage =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(RegisterPage, _PureComponent);

  _createClass(RegisterPage, null, [{
    key: "getInitialProps",
    value: function getInitialProps(_ref) {
      var query = _ref.query;
      return {
        _id: query ? query._id : null,
        token: query ? query.token : null
      };
    }
  }]);

  function RegisterPage(props) {
    var _this;

    _classCallCheck(this, RegisterPage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RegisterPage).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleChange", function (event) {
      var _event$target = event.target,
          name = _event$target.name,
          value = _event$target.value;

      _this.setState(_defineProperty({}, name, value));
    });

    _this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordRepeat: '',
      subscribeToken: _this.props.token,
      _id: _this.props._id
    };
    return _this;
  }

  _createClass(RegisterPage, [{
    key: "render",
    // handleSubscribe = () => {
    //   this.setState({ isSubmitting: true, error: '', message: '' })
    //   this.props.SUBSCRIBE_MUTATION({
    //     variables: {
    //       input: {
    //         email: this.state.email
    //       }
    //     }
    //   }).then((response) => {
    //     return this.setState({ message: response.data.Subscribe.message, isSubmitting: false })
    //   }).catch((error) => {
    //     this.setState({ isSubmitting: false })
    //     console.error(error)
    //   })
    // }
    // handleRegister = () => {
    //   this.setState({ isSubmitting: true, error: '', message: '' })
    //   this.props.REGISTER_MUTATION({
    //     variables: {
    //       input: {
    //         subscribeToken: this.state.subscribeToken,
    //         firstName: this.state.firstName,
    //         lastName: this.state.lastName,
    //         _id: this.state._id,
    //         password: this.state.password,
    //         passwordRepeat: this.state.passwordRepeat
    //       }
    //     }
    //   }).then((response) => {
    //     return this.setState({ message: response.data.Register.message, isSubmitting: false })
    //   }).catch((error) => {
    //     return this.setState({ isSubmitting: false, error })
    //   })
    // }
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          _id = _this$state._id,
          subscribeToken = _this$state.subscribeToken,
          email = _this$state.email,
          isSubmitting = _this$state.isSubmitting,
          message = _this$state.message,
          firstName = _this$state.firstName,
          lastName = _this$state.lastName,
          password = _this$state.password,
          passwordRepeat = _this$state.passwordRepeat;

      if (_id && subscribeToken) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_App__WEBPACK_IMPORTED_MODULE_3__["default"], {
          showNavigation: false,
          title: "Login"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_apollo__WEBPACK_IMPORTED_MODULE_1__["Mutation"], {
          mutation: REGISTER_MUTATION,
          variables: {
            input: _objectSpread({}, this.state)
          }
        }, function (register, _ref2) {
          var loading = _ref2.loading,
              error = _ref2.error,
              called = _ref2.called;
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers_Register__WEBPACK_IMPORTED_MODULE_6__["default"], {
            register: register,
            handleChange: _this2.handleChange,
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            passwordRepeat: passwordRepeat
          });
        }));
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_App__WEBPACK_IMPORTED_MODULE_3__["default"], {
        showNavigation: false,
        title: "Register"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_apollo__WEBPACK_IMPORTED_MODULE_1__["Mutation"], {
        mutation: SUBSCRIBE_MUTATION,
        variables: {
          input: {
            email: email
          }
        }
      }, function (subscribe, _ref3) {
        var loading = _ref3.loading,
            error = _ref3.error,
            called = _ref3.called;
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers_Subscribe__WEBPACK_IMPORTED_MODULE_7__["default"], {
          subscribe: subscribe,
          handleChange: _this2.handleChange,
          email: email,
          loading: loading,
          error: error,
          called: called
        });
      }));
    }
  }]);

  return RegisterPage;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

var REGISTER_MUTATION = graphql_tag__WEBPACK_IMPORTED_MODULE_2___default()(_templateObject2());
/* harmony default export */ __webpack_exports__["default"] = (RegisterPage);
    (function (Component, route) {
      if(!Component) return
      if (false) {}
      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/register")
  
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=register.js.a197358e002b0e330189.hot-update.js.map