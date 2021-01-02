class Person {
    constructor() {
        this.id = 0;
        this.name = '';
        this.number = '';
    }

    static from(json) {
        return Object.assign(new Person(), json);
    }

    equals(person) {
        return this.id === person.id || this.name.toLowerCase() === person.name.toLowerCase();
    }
}

export default Person;