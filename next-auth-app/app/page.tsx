// ****************** Way 1 -  React Way / Client component (using useSession hook) **********************
// **** Downsides - Since this is client compoennt, we need to add useEffect if we want to show let's say profile pic of user ***
/*
"use client";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

const HomePage = () => {
  const { data: session, status } = useSession();
  console.log({ session });
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {status === "authenticated" && (
        <button
          className="px-2 py-1 border rounded-lg"
          onClick={() => signOut()}
        >
          Logout
        </button>
      )}
      {status === "unauthenticated" && (
        <button
          className="px-2 py-1 border rounded-lg"
          onClick={() => signIn()}
        >
          Login
        </button>
      )}

      {status === "authenticated" && (
        <h3 className="text-4xl font-bold">
          Welcome{" "}
          <span className=" text-blue-500 ">{session.user.username}</span>
        </h3>
      )}
    </div>
  );
};

export default function Home() {
  return (
    <SessionProvider>
      <HomePage />
    </SessionProvider>
  );
}
*/

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";

// *************** Way 2 - Using server session / componenet ****************
export default async function Home() {
  const session = await getServerSession(authOptions);
  // console.log({ session });
  return (
    <div>
      <h3 className="text-4xl font-bold">{JSON.stringify(session)}</h3>
    </div>
  );
}
