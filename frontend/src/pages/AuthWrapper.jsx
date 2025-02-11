import { Link, Outlet } from "react-router-dom";

export default function AuthWrapper() {
  return (
    <div className="w-[90%] md:w-[80%] lg:w-[70%] 2xl:w-[60%] mx-auto flex flex-col py-5">
      <Outlet />
      <div className="flex items-center w-full md:w-[80%] 2xl:w-[70%] mx-auto">
        <p className="text-gray-500 text-base">
          Dont have an account?{" "}
          <Link to="/sign-up" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
