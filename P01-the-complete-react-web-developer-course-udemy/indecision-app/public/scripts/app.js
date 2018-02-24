"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Counter = function (_React$Component) {
  _inherits(Counter, _React$Component);

  function Counter(props) {
    _classCallCheck(this, Counter);

    var _this = _possibleConstructorReturn(this, (Counter.__proto__ || Object.getPrototypeOf(Counter)).call(this, props));

    _this.handleAddOne = _this.handleAddOne.bind(_this);
    _this.handleMinusOne = _this.handleMinusOne.bind(_this);
    _this.handleReset = _this.handleReset.bind(_this);

    _this.state = {
      count: 0
    };
    return _this;
  }

  _createClass(Counter, [{
    key: "handleAddOne",
    value: function handleAddOne() {
      console.log("addOne");

      // in Arrow functions with only one line of return,
      // when returned parameter is an object and if you wish not to use the keyword return,
      // enclose the arrow function in ()
      this.setState(function (prevState) {
        return { count: prevState.count + 1 };
      });

      /*
      The newer way to implement setState is -
      this.setState({
      count : 0
      });
       but, the problem with this syntax arises when we try to access the previous state of the variable, since, there is no prevState argument possible in this syntax.
      However, the work around is to use 'this.state.variable' -
       this.setState({
      count : this.state.count + 1
      });
       But, this is still problematic.
      Suppose, the two calls mentioned above are made sequentially. the user will expect the output to be 1, since, it is first made 0 and then incrememted by 1.
      However, this is not the output one will get because the function setState is an asynchronous. The count might be equal to 1, or it might end up with the value count + 1. If the count gets incremented before it turns to 0, it will be retained and won't be turned to 0.
       Now, what will happen if the stable syntax which we have used is followed and two similar calls are made to setState?
       React will not handle the two setState events separately. it will batch the two calls into one and implement them sequentially. Thus, the syntax we have used is more stable.
       */
    }
  }, {
    key: "handleMinusOne",
    value: function handleMinusOne() {
      console.log("minusOne");
      this.setState(function (prevState) {
        return { count: prevState.count - 1 };
      });
    }
  }, {
    key: "handleReset",
    value: function handleReset() {
      console.log("reset");
      this.setState(function () {
        return { count: 0 };
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h1",
          null,
          "Count: ",
          this.state.count
        ),
        React.createElement(
          "button",
          { onClick: this.handleAddOne },
          "+1"
        ),
        React.createElement(
          "button",
          { onClick: this.handleMinusOne },
          "-1"
        ),
        React.createElement(
          "button",
          { onClick: this.handleReset },
          "reset"
        )
      );
    }
  }]);

  return Counter;
}(React.Component);

ReactDOM.render(React.createElement(Counter, null), document.getElementById('app'));
