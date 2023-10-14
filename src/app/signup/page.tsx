"use client";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const page = () => {
  const router = useRouter();
  const [user, setuser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignUp = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("/api/users/signup", user);
      console.log("signup success", res.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing" : "Signup"}</h1>
        <hr />
        <form
          onSubmit={onSignUp}
          className="flex flex-col items-center justify-center"
        >
          <label htmlFor="username">username</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black "
            id="username"
            value={user.username}
            onChange={(e) => setuser({ ...user, username: e.target.value })}
            type="text"
            placeholder="username"
          />
          <label htmlFor="email">email</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            value={user.email}
            onChange={(e) => setuser({ ...user, email: e.target.value })}
            type="email"
            placeholder="email"
          />
          <label htmlFor="password">password</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setuser({ ...user, password: e.target.value })}
            placeholder="password"
          />
          <button
            type="submit"
            className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 border text-white"
          >
            {buttonDisabled ? "No Signup" : "Signup"}
          </button>
        </form>
        <Link href="/login">Visit Login page</Link>
      </div>
    </>
  );
};

export default page;
