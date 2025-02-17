import { Link, Outlet, useLocation } from "react-router-dom";

export default function AuthWrapper() {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <div className="w-[90%] md:w-[80%] lg:w-[70%] 2xl:w-[60%] mx-auto flex flex-col py-5">
      <Outlet />
      <div className="flex items-center w-full md:w-[80%] 2xl:w-[70%] mx-auto">
        {pathname === "/auth/sign-in" ? (
          <p className="text-gray-500 text-base">
            Dont have an account?{" "}
            <Link to="/auth/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </p>
        ) : (
          <p className="text-gray-500 text-base">
            Have you an account ?{" "}
            <Link to="/auth/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
