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
  "options" : []
}

const onFormSubmit = (e) =>{

  e.preventDefault();

  const option = e.target.elements.option.value;
  if (option){
    app.options.push(option);
    e.target.elements.option.value = '';
    console.log(app.options);
  }
  FormHandler();
}

const removeAll = (e) => {
  e.preventDefault();

  app.options = [];
  console.log(app.options);
  FormHandler();
}

const numbers = [1,2,3];

const onMakeDecision = () => {

  const random = Math.floor(Math.random() * app.options.length);
  // console.log(random);
  const option = app.options[random];
  alert(option);
};

const FormHandler = () => {

  const templateThree = (
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>subtitle: {app.subtitle}</p>}
      <div>
        <span>{app.options && app.options.length > 0  ? 'Here are your options: ' : 'No options'}</span>
        <span>: {app.options.length}</span>
      </div>
      <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
      <button onClick={removeAll}>Remove All</button>
      <ol>
        {
          app.options.map((val) => {
            return <li key={val+"-1"}>{val}</li>
          })
        }
      </ol>
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option" />
        <button>Add Option</button>
      </form>
    </div>
  );

  ReactDOM.render(templateThree, appRoot);
}

FormHandler();
