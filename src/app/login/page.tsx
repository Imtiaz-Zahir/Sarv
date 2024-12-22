"use client";
import { loginUserAction } from "@/actions/user";
import React, { useContext } from "react";
import { context } from "../Context";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const appContext = useContext(context);
  const router = useRouter();
  const [data, setData] = React.useState({ email: "", password: "" });

  async function handleSubmit(e: React.FormEvent) {
    try {
      e.preventDefault();

      const response = await loginUserAction(data);
      if (!response.success) {
        alert(response.message);
        return;
      }
      localStorage.setItem("user", JSON.stringify(response.user));

      if (response.user) {
        appContext?.setUser(response.user);
      }
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again later.");
    }
  }
  return (
    <form
      className="w-full mt-5 bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Login</h2>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          required
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          placeholder="Enter your email"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          required
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          placeholder="Enter your password"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Login
      </button>
      <p className="text-end mt-2">
        Don&apos;t have an account{" "}
        <Link href="/register" className="text-blue-600">
          Register
        </Link>
      </p>
    </form>
  );
}
