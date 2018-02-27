import React from 'react';
import ReactDOM from 'react-dom';


export default class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);

    this.state = {
      error: undefined
    };
  }
  handleAddOption(e) {

    e.preventDefault();
    // console.log(testing);

    let target = e.target.elements.optionInput.value.trim();
    const error = this.props.handleAddOption(target);

    // error is equivalent to error: error
    this.setState(()=>({error}));

    if (!error) {
      e.target.elements.optionInput.value="";

    }
  }

  render() {
    return (
      <div>
        <p>{this.state.error}</p>
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="optionInput"/>
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}
