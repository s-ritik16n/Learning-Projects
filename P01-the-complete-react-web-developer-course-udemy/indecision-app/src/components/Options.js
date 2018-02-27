import React from 'react';
import ReactDOM from 'react-dom';
import Option from './Option';

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


// stateless functional component
const Options = (props) => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions}>Remove All</button>
      {props.options.length === 0 && <p>Please add an option!</p>}
      <ol>
        {
          props.options.map((option) => <Option key={`${option}-1`} optionText={option} handleDeleteOption={props.handleDeleteOption}/>)
        }
      </ol>
    </div>
  );
};

export default Options;
