// Given array of numbers as parameter, return the max value
function maxValue(arr: number[]): number {
  return arr.reduce((acc, ele) => (ele > acc ? ele : acc));
}

console.log(maxValue([-2, 7, 8, 20, -8, 0]));

// Given array of users, Find users which can vote
interface User {
  name: string;
  age: number;
}

function filteredUsers(users: User[]): User[] {
  return users.filter((user) => user.age >= 18);
}

console.log(
  filteredUsers([
    { name: "Sanchit", age: 25 },
    { name: "Saksham", age: 17 },
  ])
);
