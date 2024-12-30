interface User4 {
  id: string;
  name: string;
}

// Way 1
type Users4 = {
  [key: string]: User4;
};

const usersObj: Users4 = {
  ab1: { id: "ab1", name: "Sam" },
  ab2: { id: "ab2", name: "Tamba" },
};
console.log(usersObj["ab2"]);

// Way 2 - Record
// Record lets you give a cleaner type to objects
type UsersRecord = Record<string, User4>;
const users: UsersRecord = {
  ab1: { id: "ab1", name: "Sam" },
  ab2: { id: "ab2", name: "Tamba" },
};

console.log(users["ab1"]);

// Way 3 - Map
const usersMap = new Map<string, User4>();
usersMap.set("ab3", { id: "ab3", name: "Virat" });
usersMap.set("ab3", { id: "ab4", name: "Rohit" });

console.log(usersMap.get("ab3"));
