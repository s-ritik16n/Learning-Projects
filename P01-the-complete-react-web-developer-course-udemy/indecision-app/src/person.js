console.log('person.js is running');

const isAdult = (age) => age >= 18;

const canDrink = (age) => age >= 21;

const isSenior = (age) => age >= 64;

export default isSenior;

export {isAdult, canDrink};

// export {isAdult, canDrink, isSenior as default};
