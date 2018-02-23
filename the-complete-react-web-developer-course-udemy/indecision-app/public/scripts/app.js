"use strict";

var appRoot = document.getElementById('app');

var toggleText = "show";
var toggleBool = true;
var details = "";

var toggleVisibility = function toggleVisibility(e) {
  e.preventDefault();

  toggleBool = !toggleBool;
  if (toggleBool) {
    details = "";
    toggleText = "show";
  } else {
    details = "details";
    toggleText = "hide";
  }
  VisibilityToggle();
};

var VisibilityToggle = function VisibilityToggle() {

  var templateOne = React.createElement(
    "div",
    null,
    React.createElement(
      "h1",
      null,
      "Visibility toggle"
    ),
    React.createElement(
      "button",
      { onClick: toggleVisibility },
      toggleText,
      " details"
    ),
    React.createElement(
      "p",
      null,
      details
    )
  );
  ReactDOM.render(templateOne, appRoot);
};

VisibilityToggle();
