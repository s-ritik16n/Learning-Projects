import React from 'react';
import ReactDOM from 'react-dom';

export default class Option extends React.Component {
  render (){
    return (
        <div>
        <li key={this.props.option}>{this.props.optionText}</li>
        <button onClick={(e) => {this.props.handleDeleteOption(this.props.optionText)}} >remove</button>
        </div>
    );
  }
}
