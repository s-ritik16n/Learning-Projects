"use strict";

console.log("app.js is running");

var template = React.createElement(
  "p",
  null,
  "This is JSX"
); // this is converted to React.createElement({...})
var appRoot = document.getElementById("app");

// test conditional rendering by removing location and name from 'user' object and changing age
var user = {
  "name": "Ritik",
  "age": 17,
  "location": "Bangalore"
};

// var userName = "Ritik Saxena";
// var userAge = 21;
// var userLocation = "Bangalore";

function getLocation(location) {
  if (location) {
    return React.createElement(
      "p",
      null,
      "Location: ",
      location
    );
  }
  // undefined is automatcally returned if no return statement is specified
}

// if JSX expression resolves to undefined, it is not displayed
// undefined, null and booleans are ignored for rendering by JSX

var templateTwo = React.createElement(
  "div",
  null,
  React.createElement(
    "h1",
    null,
    user.name ? user.name.toUpperCase() : undefined
  ),
  user.age && user.age >= 18 && React.createElement(
    "p",
    null,
    "Age: ",
    user.age
  ),
  getLocation(user.location)
);

// ReactDOM.render(templateTwo, appRoot);

var app = {
  "title": "Indecision App",
  "subtitle": "Put your life in the hands of a computer",
  "options": ['One', 'Two']
};

var templateThree = React.createElement(
  "div",
  null,
  React.createElement(
    "h1",
    null,
    app.title
  ),
  app.subtitle && React.createElement(
    "p",
    null,
    "subtitle: ",
    app.subtitle
  ),
  React.createElement(
    "div",
    null,
    React.createElement(
      "span",
      null,
      app.options && app.options.length > 0 ? 'Here are your options: ' : 'No options'
    ),
    React.createElement(
      "span",
      null,
      app.options
    )
  )
);

ReactDOM.render(templateThree, appRoot);

var count = 0;
var someId = "my-id";

var addOne = function addOne() {
  console.log("addOne");
};

var minusOne = function minusOne() {
  console.log("minusOne");
};

var reset = function reset() {
  console.log("reset");
};

// class is used as className in JSX
// we can also define inline eventlistener functions - onClick = {()=>{console.log("addOne")}}
var templateFour = React.createElement(
  "div",
  null,
  React.createElement(
    "h1",
    null,
    "Count: ",
    count
  ),
  React.createElement(
    "button",
    { id: someId, className: "button", onClick: addOne },
    "+1"
  ),
  React.createElement(
    "button",
    { className: "button", onClick: minusOne },
    "-1"
  ),
  React.createElement(
    "button",
    { className: "button", onClick: reset },
    "reset"
  )
);

ReactDOM.render(templateFour, appRoot);
