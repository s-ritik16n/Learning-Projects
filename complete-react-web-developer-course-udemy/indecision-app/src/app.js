console.log("app.js is running");

const template = <p>This is JSX</p> // this is converted to React.createElement({...})
const appRoot = document.getElementById("app");

// test conditional rendering by removing location and name from 'user' object and changing age
const user = {
  "name": "Ritik",
  "age": 17,
  "location" : "Bangalore"
};

// var userName = "Ritik Saxena";
// var userAge = 21;
// var userLocation = "Bangalore";

function getLocation(location){
  if (location) {
    return <p>Location: {location}</p>
  }
  // undefined is automatcally returned if no return statement is specified
}

// if JSX expression resolves to undefined, it is not displayed
// undefined, null and booleans are ignored for rendering by JSX

const templateTwo = (
  <div>
    <h1>{user.name ? user.name.toUpperCase() : undefined}
    </h1>
    {user.age && user.age >=18 && <p>Age: {user.age}</p>}
    {getLocation(user.location)}
  </div>
);

// ReactDOM.render(templateTwo, appRoot);

const app = {
  "title" : "Indecision App",
  "subtitle" : "Put your life in the hands of a computer",
  "options" : ['One', 'Two']
}

const templateThree = (
  <div>
    <h1>{app.title}</h1>
    {app.subtitle && <p>subtitle: {app.subtitle}</p>}
    <div>
      <span>{app.options && app.options.length > 0  ? 'Here are your options: ' : 'No options'}</span>
      <span>{app.options}</span>
    </div>
  </div>
);

ReactDOM.render(templateThree, appRoot);

let count = 0;
const someId = "my-id"

const addOne = () => {
  console.log("addOne");
}

const minusOne = () => {
  console.log("minusOne");
}

const reset = () => {
  console.log("reset");
}

// class is used as className in JSX
// we can also define inline eventlistener functions - onClick = {()=>{console.log("addOne")}}
const templateFour = (
  <div>
    <h1>Count: {count}</h1>
    <button id={someId} className="button" onClick={addOne}>+1</button>
    <button className="button" onClick={minusOne}>-1</button>
    <button className="button" onClick={reset}>reset</button>
  </div>
);

ReactDOM.render(templateFour, appRoot);
