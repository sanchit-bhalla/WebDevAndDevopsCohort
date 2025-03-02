// Register.tsx
import React, { useState } from "react";
import Input from "./Input";
import { Link } from "react-router-dom";
import Button from "./Button";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
  };

  return (
    <div className="col-span-full flex justify-center items-center ">
      <div className="w-96 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold mb-4 text-purple-600">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            title="Submit"
            size="md"
            variant="primary"
            loading={true}
            extraStyles="w-full w-max-sm"
          />
        </form>
        <p className="mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 hover:underline">
            Signin here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
