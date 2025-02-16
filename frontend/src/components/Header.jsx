import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full flex items-center py-5 justify-between border-b-[1px] border-b-gray-300/[.2]">
      <Link
        to={"/"}
        className="text-2xl font-bold tracking-[1px] px-2 py-1 shadow-md shadow-sky-700/[.2] rounded-lg"
      >
        <span className="text-xl font-bold tracking-[1px] text-sky-700">
          simple
        </span>
        <span className="text-2xl font-bold tracking-[1px] text-fuchsia-950">
          Auth
        </span>
      </Link>

      <div className="flex items-center gap-4">
        <Link
          to={"/auth/sign-in"}
          className="text-base font-bold tracking-[1px] text-gray-200 hover:bg-fuchsia-950 bg-fuchsia-900 px-3 py-1 rounded-lg"
        >
          Sign In
        </Link>
        <Link
          to={"/auth/sign-up"}
          className="text-base font-bold tracking-[1px] text-gray-200 px-3 py-1 rounded-lg border-[1px] border-fuchsia-900 hover:border-fuchsia-950"
        >
          Sign Up
        </Link>
      </div>
    </header>
  );
}
