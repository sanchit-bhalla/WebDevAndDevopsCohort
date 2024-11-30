import { useFetch } from "../custom-hooks/useFetch";

const Users = () => {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  let users;
  if (data?.length === 0) users = "No User present";
  else {
    users = (
      <ul>
        List of users
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    );
  }

  if (loading) return "Loading...";
  if (error) return "Some Error occured :(";
  return users;
};

export default Users;
