class OldSyntax {
    constructor() {
        this.name="Mike";
        this.getGreeting = this.getGreeting.bind(this);
    }
    getGreeting() {
        return `Hi. My name is ${this.name}`
    }
}
const OS = new OldSyntax();
console.log(OS);
const getGreeting = OS.getGreeting;
console.log(getGreeting());


class NewSyntax {
    name = "Jen";
    getGreeting = () => {
        return `Hi. My name is ${this.name}`;
    }
}
const NS = new NewSyntax();
console.log(NS);
const newGetGreeting = NS.getGreeting;
console.log(newGetGreeting());
