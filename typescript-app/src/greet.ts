interface User {
  name: string;
  age: number;
  gender?: string;
}

const greet = (user: User) => {
  console.log(`Hello, ${user.name}`);
};

greet({ name: "Sanchit", age: 25 });
