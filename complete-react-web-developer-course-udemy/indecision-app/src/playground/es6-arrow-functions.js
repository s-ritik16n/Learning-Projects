const square = function(x){
  return x*x;
}

console.log(square(8));

// const squareArrow = x => {
//   return x*x;
// }

const squareArrow = (x,y) => x*y;

console.log(squareArrow(8,9));

const getFirstName = name => name.split(" ")[0];

console.log(getFirstName("ritik saxena"));
