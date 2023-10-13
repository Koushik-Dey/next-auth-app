"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const page = () => {
  const [user, setuser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const onSignUp = async () => {};

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Signup</h1>
        <hr />
        <label htmlFor="username">username</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          id="username"
          value={user.username}
          onChange={(e) => setuser({ ...user, username: e.target.value })}
          type="text"
          placeholder="username"
        />
        <label htmlFor="email">email</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          id="email"
          value={user.email}
          onChange={(e) => setuser({ ...user, email: e.target.value })}
          type="email"
          placeholder="email"
        />
        <label htmlFor="password">password</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          id="password"
          value={user.password}
          onChange={(e) => setuser({ ...user, password: e.target.value })}
          type="password"
          placeholder="password"
        />
        <button
          onClick={onSignUp}
          className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white text-black"
        >
          Signup
        </button>
        <Link href="/login">Visit Login page</Link>
      </div>
    </>
  );
};

export default page;
