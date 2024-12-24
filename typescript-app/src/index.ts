// Try changing removeComments property in tsconfig.json
let x: number = 1;
x = 5;
// x = "some text" // error
console.log(x);

const greet = (name: string) => {
  console.log(`Hello ${name}`);
};
