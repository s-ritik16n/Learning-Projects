class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: props.options
    }
    console.log(this.state.options);

    this.handleDeleteOptions        = this.handleDeleteOptions.bind(this);
    this.handlePick                 = this.handlePick.bind(this);
    this.handleAddOption            = this.handleAddOption.bind(this);
    this.handleDeleteOption         = this.handleDeleteOption.bind(this);
  }

  handleDeleteOptions() {
    this.setState(() => ({options: this.props.options}));
  }

  handleDeleteOption(optionToRemove) {
      this.setState((prevState) => ({
          options: prevState.options.filter((option) => option !== optionToRemove)
      }))
  }

  // handleDeleteOption(optionToRemove) {
  //    this.setState((prevState) => ({
  //      options: prevState.options.filter((option) => optionToRemove !== option)
  //    }))
  //   }

  handlePick() {
    const random = Math.floor(Math.random()*this.state.options.length);
    alert(this.state.options[random]);
  }

  handleAddOption(option) {
    // push manipulates the original array, we should not do it. so we use concat
    if (!option) {
      return 'Enter valid value to add item to list';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }
    this.setState((prevState) => ({options:prevState.options.concat(option)}));
  }

  render() {
    const subtitle = "Put your life in the hands of a computer";

    return (
      <div>
        <Header subtitle={subtitle}/>
        <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick}/>
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption handleAddOption={this.handleAddOption}/>
      </div>
    );
  }
}

// the sole reason for putting this is to keep the app from breaking if options is not passed in <IndecisionApp /> in the render call
IndecisionApp.defaultProps = {
  options : []
};

// stateless functional component
const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
};

Header.defaultProps = {
  title : "Indecision"
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
const Action = (props) => {
  return (
    <div>
      <button
      onClick={props.handlePick}
      disabled={!props.hasOptions}
      >
        What should I do?
      </button>
    </div>
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
const Options = (props) => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions}>Remove All</button>
      <ol>
        {
          props.options.map((option) => <Option key={`${option}-1`} optionText={option} handleDeleteOption={props.handleDeleteOption}/>)
        }
      </ol>
    </div>
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


class Option extends React.Component {
  render (){
    return (
        <div>
        <li key={this.props.option}>{this.props.optionText}</li>
        <button onClick={(e) => {this.props.handleDeleteOption(this.props.optionText)}} >remove</button>
        </div>
    );
  }
}

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);

    this.state = {
      error: undefined
    };
  }
  handleAddOption(e) {
    e.preventDefault();

    let target = e.target.elements.optionInput.value.trim();
    const error = this.props.handleAddOption(target);
    e.target.elements.optionInput.value="";

    // error is equivalent to error: error
    this.setState(()=>({error}));

  }
  render() {
    return (
      <div>
        <p>{this.state.error}</p>
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="optionInput"/>
          <button type="submit">Add Option</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<IndecisionApp options={['Devil\'s Den', 'Second District']}/>, document.getElementById("app"));
