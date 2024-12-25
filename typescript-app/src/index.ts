// Try changing removeComments property in tsconfig.json
let x: number = 1;
x = 5;
// x = "some text" // error
console.log(x);

// check if user is allowed to vote or not
const allowed = (age: number) => {
  if (age >= 18) return true;
  return false;
};

console.log(`User is ${allowed(18) ? "allowed" : "not allowed"} to vote`);
