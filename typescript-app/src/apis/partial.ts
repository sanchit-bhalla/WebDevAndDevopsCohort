// Partial makes all properties of a type optional, creating a type with the same properties, but each marked as optional.

// Specifically useful when you want to do updates
interface User3 {
  id: string;
  name: string;
  age: string;
  email: string;
  password: string;
}

type UpdateProps = Pick<User3, "name" | "age" | "email">;

type UpdatePropsOptional = Partial<UpdateProps>;

function updateUser(updateProps: UpdatePropsOptional) {
  // hit the database to update the user
}

updateUser({});
