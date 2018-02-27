import React from 'react';
import ReactDOM from 'react-dom';
import AddOption from './AddOption';         // no need to mention '.js'
import Header from './Header';
import Action from './Action';
import Options from './Options';

export default class IndecisionApp extends React.Component {
    state = {
        options:[]
    }
  // constructor(props) {
  //   super(props);
  //   // this.state = {
  //   //   options: []
  //   // }
  //   console.log(this.state.options);
  //
  //   this.handleDeleteOptions        = this.handleDeleteOptions.bind(this);
  //   this.handlePick                 = this.handlePick.bind(this);
  //   this.handleAddOption            = this.handleAddOption.bind(this);
  //   this.handleDeleteOption         = this.handleDeleteOption.bind(this);
  // }

  componentDidMount = () => {
    // not available for stateless functions
    console.log('fetching data');
    try {

      const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if (options) {
        setState(() => ({options}));
      }

    } catch (e) {

    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if(prevState.options.length !== this.state.options.length) {
      console.log('saving data');
      localStorage.setItem('options',JSON.stringify(this.state.options));
    }
  }

  componentWillUnmount = () => {
    console.log('componentWillUnmount');
  }

  handleDeleteOptions = () => {
    this.setState(() => ({options: []}));
  }

  handleDeleteOption = (optionToRemove) => {
      this.setState((prevState) => ({
          options: prevState.options.filter((option) => option !== optionToRemove)
      }))
  }

  handlePick = () => {
    const random = Math.floor(Math.random()*this.state.options.length);
    alert(this.state.options[random]);
  }

  handleAddOption = (option) => {
    // push manipulates the original array, we should not do it. so we use concat
    if (!option) {
      return 'Enter valid value to add item to list';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }
    this.setState((prevState) => ({options:prevState.options.concat(option)}));
  }

  render = () => {
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
// IndecisionApp.defaultProps = {
//   options : []
// };
