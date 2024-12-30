// Pick allows you to create a new type by selecting a set of properties (Keys) from an existing type (Type).

interface User2 {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

type UserProfile = Pick<User2, "name" | "email">;

const displayUserProfile = (user: UserProfile) => {
  console.log(`Name: ${user.name}\nEmail: ${user.email}`);
};

displayUserProfile({ name: "Sanchit", email: "sb@acb.com" });
