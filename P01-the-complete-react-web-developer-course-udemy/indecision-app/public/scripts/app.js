'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
  _inherits(IndecisionApp, _React$Component);

  function IndecisionApp(props) {
    _classCallCheck(this, IndecisionApp);

    var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

    _this.state = {
      options: ['One', 'Two', 'Three']
    };
    _this.handleDeleteOption = _this.handleDeleteOption.bind(_this);
    _this.handlePick = _this.handlePick.bind(_this);
    _this.handleAddOption = _this.handleAddOption.bind(_this);
    return _this;
  }

  _createClass(IndecisionApp, [{
    key: 'handleDeleteOption',
    value: function handleDeleteOption() {
      this.setState(function () {
        return { options: [] };
      });
    }
  }, {
    key: 'handlePick',
    value: function handlePick() {
      var random = Math.floor(Math.random() * this.state.options.length);
      alert(this.state.options[random]);
    }
  }, {
    key: 'handleAddOption',
    value: function handleAddOption(option) {
      // push manipulates the original array, we should not do it. so we use concat
      if (!option) {
        return 'Enter valid value to add item to list';
      } else if (this.state.options.indexOf(option) > -1) {
        return 'This option already exists';
      }
      this.setState(function (prevState) {
        return { options: prevState.options.concat(option) };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var title = "Indecision";
      var subtitle = "Put your life in the hands of a computer";

      return React.createElement(
        'div',
        null,
        React.createElement(Header, { title: title, subtitle: subtitle }),
        React.createElement(Action, { hasOptions: this.state.options.length > 0, handlePick: this.handlePick }),
        React.createElement(Options, {
          options: this.state.options,
          handleDeleteOption: this.handleDeleteOption
        }),
        React.createElement(AddOption, { handleAddOption: this.handleAddOption })
      );
    }
  }]);

  return IndecisionApp;
}(React.Component);

// stateless functional component


var Header = function Header(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      props.title
    ),
    React.createElement(
      'h2',
      null,
      props.subtitle
    )
  );
};

// class Header extends React.Component{
//   render() {
//     console.log(this.props);
//     return (
//       <div>
//         <h1>{this.props.title}</h1>
//         <h2>{this.props.subtitle}</h2>
//       </div>
//     );
//   }
// }


// stateless functional component
var Action = function Action(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      {
        onClick: props.handlePick,
        disabled: !props.hasOptions
      },
      'What should I do?'
    )
  );
};
//
// class Action extends React.Component {
//   render() {
//     return (
//       <div>
//         <button
//         onClick={this.props.handlePick}
//         disabled={!this.props.hasOptions}
//         >
//           What should I do?
//         </button>
//       </div>
//     );
//   }
// }

// stateless functional component
var Options = function Options(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      { onClick: props.handleDeleteOption },
      'Remove All'
    ),
    React.createElement(
      'ol',
      null,
      props.options.map(function (option) {
        return React.createElement(Option, { key: option + '-1', optionText: option });
      })
    )
  );
};

// class Options extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//
//   render() {
//     return (
//       <div>
//         <button onClick={this.props.handleDeleteOption}>Remove All</button>
//         <ol>
//           {
//             this.props.options.map((option) => <Option key={`${option}-1`} optionText={option}/>)
//           }
//         </ol>
//       </div>
//     );
//   }
// }

var Option = function (_React$Component2) {
  _inherits(Option, _React$Component2);

  function Option() {
    _classCallCheck(this, Option);

    return _possibleConstructorReturn(this, (Option.__proto__ || Object.getPrototypeOf(Option)).apply(this, arguments));
  }

  _createClass(Option, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'li',
        { key: this.props.option },
        this.props.optionText
      );
    }
  }]);

  return Option;
}(React.Component);

var AddOption = function (_React$Component3) {
  _inherits(AddOption, _React$Component3);

  function AddOption(props) {
    _classCallCheck(this, AddOption);

    var _this3 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

    _this3.handleAddOption = _this3.handleAddOption.bind(_this3);

    _this3.state = {
      error: undefined
    };
    return _this3;
  }

  _createClass(AddOption, [{
    key: 'handleAddOption',
    value: function handleAddOption(e) {
      e.preventDefault();

      var target = e.target.elements.optionInput.value.trim();
      var error = this.props.handleAddOption(target);
      e.target.elements.optionInput.value = "";

      // error is equivalent to error: error
      this.setState(function () {
        return { error: error };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'p',
          null,
          this.state.error
        ),
        React.createElement(
          'form',
          { onSubmit: this.handleAddOption },
          React.createElement('input', { type: 'text', name: 'optionInput' }),
          React.createElement(
            'button',
            { type: 'submit' },
            'Add Option'
          )
        )
      );
    }
  }]);

  return AddOption;
}(React.Component);

// stateless functional components

var User = function User(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Name: ',
      props.name
    ),
    React.createElement(
      'p',
      null,
      'Age: ',
      props.age
    )
  );
};

// ReactDOM.render(<User name="Ritik" age="20"/>, document.getElementById("app"));
ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById("app"));
