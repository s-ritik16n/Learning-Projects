
let count = 0;
const someId = "my-id"

const addOne = () => {
  console.log("addOne");
  count++;
  // this won't update the count value in html, because react does not have implicit data binding
  // to achieve data binding, we put the JSX and render functions in a single function and render them from eventlistener
  renderCountBtn();
}

const minusOne = () => {
  console.log("minusOne");
  count--;
  renderCountBtn();
}

const reset = () => {
  console.log("reset");
  count = 0;
  renderCountBtn();
}

// class is used as className in JSX
// we can also define inline eventlistener functions - onClick = {()=>{console.log("addOne")}}
const renderCountBtn = () =>{

  const templateFour = (
    <div>
    <h1>Count: {count}</h1>
    <button id={someId} className="button" onClick={addOne}>+1</button>
    <button className="button" onClick={minusOne}>-1</button>
    <button className="button" onClick={reset}>reset</button>
    </div>
  );

  ReactDOM.render(templateFour, appRoot);
}

renderCountBtn();
