console.log('utils.js is runnnig');

// exports - default export and named exports

// named export
const square = (x) => x*x;

const add = (x,y) => x+y;

const subtract = (a,b) => a-b;

// export default const subtract = (a,b) => a-b; will give error

// export default subtract
// works

// export default
// this will also work as long as subtract function is defined


// default export
export { square, add, subtract as default };

// named export
// export const square = (x) => x*x;
