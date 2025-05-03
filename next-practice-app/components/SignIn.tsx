"use client";

import { useState } from "react";
import LabelledInput from "./LabelledInput";
import Button from "./Button";
import { useRouter } from "next/navigation";

export function Signin() {
  const [username, setUsername] = useState("");
  // const [email, setEmail] = useState('')
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSignin = async () => {
    console.log({ username, password });
    router.push("/");
  };

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
          <div>
            <div className="px-10">
              <div className="text-3xl text-gray-700 font-extrabold">
                Sign in
              </div>
            </div>
            <div className="pt-2">
              <LabelledInput
                label="Username"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <LabelledInput
                label="Password"
                type={"password"}
                placeholder="123456"
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button text="Signin" onClick={handleSignin} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
