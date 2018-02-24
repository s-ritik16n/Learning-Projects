class Person {
  constructor(age=0, name = 'anonymous') {
    this.name = name;
    this.age = age;
  }
  getGreeting() {
    // return 'Hi! ' + this.name
    return `Hi! I am ${this.name}.`;
  }
  getDescription() {
    return `${this.name} is ${this.age} year(s) old.`;
  }
}

class Student extends Person{
  constructor(name, age, major) {   // accepting arguments in different order also works. how?
    super(name, age)                // here too. sending them to super in different order works. how?
    this.major = major;
  }
  hasMajor() {
    return !!this.major;
  }
  getDescription() {
    let description = super.getDescription();

    if (this.hasMajor()) {
      description += ` Their major is ${this.major}.`;
    }
    return description;
  }
}

class Traveller extends Person {
  constructor(age, name, major, homeLocation) {
    super(age, name);
    this.major = major;
    this.homeLocation = homeLocation;
  }
  getGreeting() {
    let greeting = super.getGreeting();
    if (this.homeLocation) {
      greeting += ` I'm visiting ${this.homeLocation}`;
    }
    return greeting;
  }
}

const me = new Student(10,name='Ritik Saxena', 'Computer Science');  // why does this give error
// console.log(me);
console.log(me.getGreeting());
console.log(me.getDescription());
console.log(me.hasMajor());

const me2 = new Student();
// console.log(me2);
console.log(me2.getGreeting());
console.log(me2.getDescription());
console.log(me2.hasMajor());

const trav1 = new Traveller(10,name='Ritik Saxena', 'Computer Science', 'Bangalore');  // why does this give error
// console.log(trav1);
console.log(trav1.getGreeting());
console.log(trav1.getDescription());

const trav2 = new Traveller();
// console.log(trav2);
console.log(trav2.getGreeting());
console.log(trav2.getDescription());
