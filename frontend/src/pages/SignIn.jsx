import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <form className="w-full md:w-[80%] 2xl:w-[70%] mx-auto flex flex-col items-center gap-3 lg:gap-5 mb-5 lg:mb-7">
      <h2 className="text-2xl lg:text-3xl text-fuchsia-900 text tracking-[1px] font-bold">
        Sign In
      </h2>

      <div className="w-full flex flex-col items-start md:flex-row  md:items-end gap-2 md:gap-0 justify-between mt-4">
        <label className="text-base font-bold text-gray-400">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          className="w-[80%] px-4 py-2 border border-sky-700/[.3] shadow-sm shadow-sky-700/[.4] focus:shadow-sky-700/[.8] duration-300 text-gray-300 rounded-md focus:outline-none outline-none"
          placeholder="you@example.com"
        />
      </div>

      <div className="w-full flex flex-col items-start md:flex-row  md:items-end gap-2 md:gap-0 justify-between mt-4">
        <label className="text-base font-bold text-gray-400">Password</label>
        <input
          type="password"
          name="password"
          className="w-[80%] px-4 py-2 border border-sky-700/[.3] shadow-sm shadow-sky-700/[.4] focus:shadow-sky-700/[.8] duration-300 text-gray-300 rounded-md focus:outline-none outline-none"
          placeholder="••••••••"
        />
      </div>

      <Link
        to={"/auth/reset-password/enter-email"}
        className="text-sky-700 text-base tracking-[1px] self-start cursor-pointer"
      >
        Forgot password
      </Link>

      <button
        type="submit"
        className="text-xl uppercase font-bold tracking-[1px] text-gray-400 bg-fuchsia-900/[.4] px-3 py-2 rounded-xl hover:bg-fuchsia-900/[.7] duration-300 cursor-pointer"
      >
        Sign In
      </button>
    </form>
  );
}
