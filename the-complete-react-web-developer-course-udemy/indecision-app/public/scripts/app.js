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
  "options": []
};

var onFormSubmit = function onFormSubmit(e) {

  e.preventDefault();

  var option = e.target.elements.option.value;
  if (option) {
    app.options.push(option);
    e.target.elements.option.value = '';
    console.log(app.options);
  }
  FormHandler();
};

var removeAll = function removeAll(e) {
  e.preventDefault();

  app.options = [];
  console.log(app.options);
  FormHandler();
};

var numbers = [1, 2, 3];

var onMakeDecision = function onMakeDecision() {

  var random = Math.floor(Math.random() * app.options.length);
  // console.log(random);
  var option = app.options[random];
  alert(option);
};

var FormHandler = function FormHandler() {

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
        ": ",
        app.options.length
      )
    ),
    React.createElement(
      "button",
      { disabled: app.options.length === 0, onClick: onMakeDecision },
      "What should I do?"
    ),
    React.createElement(
      "button",
      { onClick: removeAll },
      "Remove All"
    ),
    React.createElement(
      "ol",
      null,
      app.options.map(function (val) {
        return React.createElement(
          "li",
          { key: val + "-1" },
          val
        );
      })
    ),
    React.createElement(
      "form",
      { onSubmit: onFormSubmit },
      React.createElement("input", { type: "text", name: "option" }),
      React.createElement(
        "button",
        null,
        "Add Option"
      )
    )
  );

  ReactDOM.render(templateThree, appRoot);
};

FormHandler();
