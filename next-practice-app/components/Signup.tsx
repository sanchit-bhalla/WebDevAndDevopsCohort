"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import LabelledInput from "./LabelledInput";
import Button from "./Button";
import axios from "axios";

export function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:3000/api/user", {
        username,
        email,
        password,
      });

      router.push("/signin");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
          <div>
            <div className="px-10">
              <div className="text-3xl text-gray-700 font-extrabold">
                Sign up
              </div>
            </div>
            <div className="pt-2">
              <LabelledInput
                label="Username"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <LabelledInput
                label="Email"
                placeholder="abc@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <LabelledInput
                label="Password"
                type={"password"}
                placeholder="123456"
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button text="Signup" onClick={handleSignup} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
