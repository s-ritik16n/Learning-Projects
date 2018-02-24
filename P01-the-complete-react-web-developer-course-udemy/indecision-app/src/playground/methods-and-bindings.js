const obj = {
  name :"Ritik",
  getName() {
    return this.name;
  }
}

const getName = obj.getName;
const getName2 = obj.getName.bind(obj);

console.log(obj.getName());
console.log(getName2());
console.log(getName());
