class IndecisionApp extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Action />
        <Options />
        <AddOption />
      </div>
    );
  }
}



class Header extends React.Component{
  render() {
    return (
      <div>
        <h1>Indecision</h1>
        <h2>Put your life in the hands of a computer</h2>
      </div>
    );
  }
}

class Action extends React.Component {
  render() {
    return (
      <div>
        <button>What should I do?</button>
      </div>
    );
  }
}

class Options extends React.Component {
  render() {
    return (
      <ol>
        <Option />
      </ol>
    );
  }
}

class Option extends React.Component {
  render (){
    return (
      <li>
        Option
      </li>
    );
  }
}

class AddOption extends React.Component {
  render() {
    return (
      <div>
        AddOption Here
      </div>
    );
  }
}


const appRoot = document.getElementById("app");

ReactDOM.render(<IndecisionApp />, appRoot);
