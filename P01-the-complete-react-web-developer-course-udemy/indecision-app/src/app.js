class IndecisionApp extends React.Component {
  render() {
    const title = "Indecision";
    const subtitle = "Put your life in the hands of a computer";
    const options = ["One", "Two", "Three"];

    return (
      <div>
        <Header title={title} subtitle={subtitle}/>
        <Action />
        <Options options={options}/>
        <AddOption />
        <RemoveAll />
      </div>
    );
  }
}



class Header extends React.Component{
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.subtitle}</h2>
      </div>
    );
  }
}

class Action extends React.Component {
  handlePick() {
    alert("handlePick");
  }
  render() {
    return (
      <div>
        <button onClick={this.handlePick}>What should I do?</button>
      </div>
    );
  }
}

class RemoveAll extends React.Component {
  handleRemoveAll() {
    alert("handleRemoveAll");
  }
  render() {
    return (
      <div>
        <button onClick={this.handleRemoveAll}>Remove All</button>
      </div>
    );
  }
}

class Options extends React.Component {
  render() {
    return (
      <ol>
          {
            this.props.options.map((option) => <Option key={`${option}-1`} optionText={option}/>)
          }
      </ol>
    );
  }
}

class Option extends React.Component {
  render (){
    return (
      <li key={this.props.option}>{this.props.optionText}</li>
    );
  }
}

class AddOption extends React.Component {
  handleAddOption(e) {
    e.preventDefault();

    let target = e.target.elements.optionInput.value.trim();
    if (target) {
      alert(target);
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="optionInput"/>
          <button type="submit">Add Option</button>
        </form>
      </div>
    );
  }
}


const appRoot = document.getElementById("app");

ReactDOM.render(<IndecisionApp />, appRoot);
