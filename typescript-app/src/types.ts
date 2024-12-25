/* *****  Unions  **** */
type StringOrNumber = string | number;

function printId(id: StringOrNumber) {
  console.log({ id });
}

printId(101);
printId("abc#123");

/* *****  Intersection  **** */
// Intersection lets you create a type that has every property of multiple types/ interfaces
type EmployeeType = {
  name: string;
  startDate: Date;
};

type Manager = {
  name: string;
  department: string;
};

type TeamLead = EmployeeType & Manager;

const teamLead: TeamLead = {
  name: "Shivali",
  department: "Analytics",
  startDate: new Date(2015, 3, 1),
};
