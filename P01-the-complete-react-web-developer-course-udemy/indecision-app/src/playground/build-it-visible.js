const appRoot = document.getElementById('app');

let toggleText = "show";
let toggleBool = true;
let details = "";

const toggleVisibility = (e) => {
  e.preventDefault();

  toggleBool = !toggleBool;
  if(toggleBool){
    details = "";
    toggleText = "show";
  } else {
    details = "details";
    toggleText = "hide";
  }
  VisibilityToggle();
}


const VisibilityToggle = () => {

  const templateOne = (
    <div>
      <h1>Visibility toggle</h1>
      <button onClick={toggleVisibility} >{toggleText} details</button>
      <p>{details}</p>
    </div>
  );
  ReactDOM.render(templateOne, appRoot);
}

VisibilityToggle();
