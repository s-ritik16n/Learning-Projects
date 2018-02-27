console.log("app.js is running");
// import './utils.js'

// import {square, add, subtract} from './utils.js';
// import subtract, {square, add} from './utils.js';
import anything , {square, add} from './utils.js';
import isSeniorCitizen, {isAdult, canDrink} from './person.js';

console.log(square(2));
console.log(add(3,4));

console.log(anything(3,4));
// console.log(subtract(3,4));

console.log(isAdult(23));
console.log(canDrink(22));
console.log(isSeniorCitizen(65));
