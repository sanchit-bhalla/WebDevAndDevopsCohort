// import axios from "axios";
import client from "@/db";

// Way 1
// async function getUserDetails() {
//   try {
//     const response = await axios.get("http://localhost:3000/api/user");
//     return response.data;
//   } catch (e) {
//     console.log(e);
//   }
// }

// Way 2 - Better Fetch
async function getUserDetails() {
  try {
    const user = await client.user.findFirst({});
    return {
      username: user?.username,
      email: user?.email,
    };
  } catch (e) {
    console.log(e);
  }
}

interface UserData {
  username?: string;
  email?: string;
}
export default async function Home() {
  const userData: UserData | undefined = await getUserDetails();

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <div className="border p-8 rounded">
          <div>Name: {userData?.username}</div>

          {userData?.email}
        </div>
      </div>
    </div>
  );
}
