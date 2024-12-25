interface Person {
  name: string;
  age: number;
  gender?: "M" | "F" | "O";
  designation?: string;
}

class Employee implements Person {
  name: string;
  age: number;
  gender?: "M" | "F" | "O";
  designation?: string;

  constructor({ name, age, gender, designation }: Person) {
    this.name = name;
    this.age = age;
    if (gender) this.gender = gender;
    if (designation) this.designation = designation;
  }

  greet(phrase: string) {
    console.log(`${phrase} ${this.name}`);
  }
}

class CEO extends Employee {
  constructor({ name, age, gender }: Person) {
    super({ name, age, gender, designation: "CEO" });
  }

  onboardEmployee(name: string) {
    console.log("CEO onboarded " + name + "🎉");
  }
}

const emp = new Employee({
  name: "Harshit",
  age: 25,
  gender: "M",
  designation: "Analyst",
});
emp.greet("Whts up, ");

const ceo = new CEO({
  name: "Sundar",
  age: 35,
  gender: "M",
  designation: "CEO",
});
ceo.greet("Hello, ");
ceo.onboardEmployee("Harshit");
