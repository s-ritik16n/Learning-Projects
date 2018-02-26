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

  componentDidMount() {
    console.log('componentDidMount');
    let count = localStorage.getItem('count');
    count = parseInt(count, 10);
    if(!isNaN(count))
      this.setState(() => ({count}));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      console.log('componentDidUpdate');
      localStorage.setItem('count',this.state.count);
    }
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  handleAddOne() {
      console.log("addOne");

      // in Arrow functions with only one line of return,
      // when returned parameter is an object and if you wish not to use the keyword return,
      // enclose the arrow function in ()
      this.setState((prevState) => ({count : prevState.count + 1}));

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

  handleMinusOne() {
    console.log("minusOne");
    this.setState((prevState) => ({count : prevState.count - 1}));
  }

  handleReset() {
    console.log("reset");
    this.setState(() => ({count : 0}));
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

// Counter.defaultProps = {
//   count : 0
// };

ReactDOM.render(<Counter count={4} />, document.getElementById('app'));
