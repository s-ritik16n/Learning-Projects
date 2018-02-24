class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOne   = this.handleAddOne.bind(this);
    this.handleMinusOne = this.handleMinusOne.bind(this);
    this.handleReset    = this.handleReset.bind(this);

    this.state = {
      count : 0
    }

  }
  handleAddOne() {
      console.log("addOne");

      // this.setState((prevState) => {
      //   return {
      //     count : prevState.count + 1
      //   }
      // });

      // in Arrow functions with only one line of return,
      // when returned parameter is an object and if you wish not to use the keyword return,
      // enclose the arrow function in ()
      this.setState((prevState) => ({count : prevState.count + 1}));
  }
  handleMinusOne() {
    console.log("minusOne");
    this.setState((prevState) => ({count : prevState.count - 1}));
  }
  handleReset() {
    console.log("reset");
    this.setState((prevState) => ({count : 0}))
  }
  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.handleAddOne}>+1</button>
        <button onClick={this.handleMinusOne}>-1</button>
        <button onClick={this.handleReset}>reset</button>
      </div>
    )
  }
}

ReactDOM.render(<Counter />, document.getElementById('app'));
