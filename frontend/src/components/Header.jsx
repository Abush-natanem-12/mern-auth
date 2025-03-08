import { Link } from "react-router-dom";
import { AuthContext } from "../features/context";
import { useContext, useState } from "react";

export default function Header() {
  const [tap, setTap] = useState(false);

  const { isSignedIn, userData } = useContext(AuthContext);
  return (
    <header className="w-full flex items-center py-5 justify-between border-b-[1px] border-b-gray-300/[.2]">
      <Link
        to={"/"}
        className="font-bold tracking-[1px] px-2 py-1 shadow-md shadow-sky-700/[.2] rounded-lg"
      >
        <span className="text-base font-bold tracking-[1px] text-sky-700">
          simple
        </span>
        <span className="text-xl font-bold tracking-[1px] text-fuchsia-950">
          Auth
        </span>
      </Link>

      <div className="flex items-center gap-4 relative">
        {isSignedIn ? (
          <>
            <button
              className="bg-blue-800/[.5] p-2 rounded-lg cursor-pointer"
              onClick={() => setTap((prev) => (prev = !prev))}
            >
              <img
                src="/user.svg"
                alt="user Avatar"
                className="size-4 md:size-5"
              />
            </button>
            <UserDrop tap={tap} />
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </header>
  );
}

const UserDrop = function ({ tap }) {
  return (
    <>
      {tap && (
        <div className="absolute top-[110%]  right-1 flex flex-col items-end bg-blue-800/[.1] py-2 px-4 gap-3">
          <span className="text-xs tracking-[1px] text-gray-50">Cristiano</span>

          <button className="text-xs tracking-[1px] text-gray-50 cursor-pointer">
            change Password
          </button>

          <button className="flex items-center gap-1 cursor-pointer border-[1px]  ">
            <img src="/logout.svg" alt="logout Icon" className="size-4" />
            <span className="text-sm md:text-xs text-gray-100 font-bold tracking-[1px]">
              Logout
            </span>
          </button>
        </div>
      )}
    </>
  );
};
