import { useState } from "react";
import { createAccount } from "../requests";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async function (e) {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await createAccount({ name, email, password });

      if (!response.data.success) {
        return response.data.message || "something went wrong";
      }
      setLoading(false);
      setEmail("");
      setName("");
      setPassword("");
      return response.data.message || "account created successfully";
    } catch (err) {
      console.log(err);
      return err.message || "something went wrong";
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-[80%] 2xl:w-[70%] mx-auto flex flex-col items-center gap-3 lg:gap-5 mb-5 lg:mb-7"
    >
      <h2 className="text-2xl lg:text-3xl text-sky-700 tracking-[1px] font-bold">
        Create An account
      </h2>

      <div className="w-full flex flex-col items-start md:flex-row  md:items-center gap-2 md:gap-0 justify-between mt-4">
        <label className="text-base font-bold text-gray-400">Full Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="fullName"
          className="w-[80%] px-4 py-2 border border-sky-700/[.3] shadow-sm shadow-sky-700/[.4] focus:shadow-sky-700/[.8] duration-300 text-gray-300 rounded-md focus:outline-none outline-none"
          placeholder="John Doe"
        />
      </div>

      <div className="w-full flex flex-col items-start md:flex-row  md:items-center gap-2 md:gap-0 justify-between mt-4">
        <label className="text-base font-bold text-gray-400">
          Email Address
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          className="w-[80%] px-4 py-2 border border-sky-700/[.3] shadow-sm shadow-sky-700/[.4] focus:shadow-sky-700/[.8] duration-300 text-gray-300 rounded-md focus:outline-none outline-none"
          placeholder="you@example.com"
        />
      </div>

      <div className="w-full flex flex-col items-start md:flex-row  md:items-center gap-2 md:gap-0 justify-between mt-4">
        <label className="text-base font-bold text-gray-400">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          className="w-[80%] px-4 py-2 border border-sky-700/[.3] shadow-sm shadow-sky-700/[.4] focus:shadow-sky-700/[.8] duration-300 text-gray-300 rounded-md focus:outline-none outline-none"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        className="text-xl uppercase font-bold tracking-[1px] text-gray-400 bg-sky-700/[.4] pl-3 pr-10 py-2 rounded-xl hover:bg-sky-700/[.7] duration-300 cursor-pointer relative"
      >
        Register
        {loading && (
          <img
            src="/spinner.svg"
            className="absolute top-[50%] -translate-y-[50%] right-2 size-6"
          />
        )}
      </button>
    </form>
  );
}
