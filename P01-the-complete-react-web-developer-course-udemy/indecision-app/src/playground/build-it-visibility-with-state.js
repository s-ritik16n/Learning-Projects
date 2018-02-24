class Visibility extends React.Component{
  constructor(props) {
    super(props);
    this.handleToggleText = this.handleToggleText.bind(this);
    this.state = {
      visible : false
    }
  }
  handleToggleText() {
    this.setState((prevState) => ({visible:!prevState.visible}));
  }

  render() {
    return (
      <div>
        <h1>Visibility Toggle</h1>
        <button onClick={this.handleToggleText}>{this.state.visible ? "Hide Details" : "Show Details"}</button>
        <VisibilityText details={this.state.visible && "Here are some details for you"}/>
      </div>
    );
  }
}

class VisibilityText extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>{this.props.details}</div>
    );
  }
}

ReactDOM.render(<Visibility />, document.getElementById('app'));
