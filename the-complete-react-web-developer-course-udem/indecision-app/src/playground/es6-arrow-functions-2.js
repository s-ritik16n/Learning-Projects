// arguments object is no longer bound with arrow functions
// 'this' keyword is no longer bound with arrow functions

const user = {
  "name" : "Andrew",
  "cities" : ["Philadelphia", "New York", "Dublin"],
  printPlacesLived(){ // ES6 allows this type of non key-value paired function definition inside the object

    console.log(this.name);
    console.log(this.cities);

    // the below function gives the error - annot read property 'name' of undefined
    // since 'this' is accessible in the parent function only
    // to overcome it, we use a workaround of 'that' variable
    // const that = this;

    // this.cities.forEach(function(city){
    //   console.log(this.name + " - "+ city);
    //   // console.log(that.name + " - "+ city);
    // });


    // this is not bound with arrow functions
    this.cities.forEach(city => {
      console.log(this.name + " - "+ city);
    });

    // using map, the arrow function would look like -
    return this.cities.map(city => this.name + " - "+ city);
  }
}

console.log(user.printPlacesLived());

const multiplier = {
  "numbers" : [1,2],
  "multiplyBy" : 2,
  multiply(){
    return this.numbers.map(number => number * this.multiplyBy);
  }
}

console.log(multiplier.multiply());
