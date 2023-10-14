"use client";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast/headless";

const Loginpage = () => {
  const router = useRouter();
  const [user, setuser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      const req = await axios.post("/api/users/login", user);
      console.log(req);
      router.push("/profile");
      toast.success("Login success");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.messgae);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing" : "Login"}</h1>
        <hr />
        <form
          onSubmit={onLogin}
          className="flex flex-col justify-center items-center"
        >
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
            value={user.password}
            onChange={(e) => setuser({ ...user, password: e.target.value })}
            type="password"
            placeholder="password"
          />
          <button
            type="submit"
            className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white text-black"
          >
            Login
          </button>
        </form>
        <Link href="/signup">Visit Signup page</Link>
      </div>
    </>
  );
};

export default Loginpage;
