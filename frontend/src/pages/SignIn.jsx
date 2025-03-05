import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { signInValidations } from "../validations/inputValidations";
import { loginUser } from "../requests";
import { AuthContext } from "../features/context.jsx";
import { useContext } from "react";

export default function SignIn() {
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);

  const { errors, values, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: async (values) => {
        try {
          await loginUser(values);
          navigate("/");
        } catch (error) {
          console.log(
            `Error happening while logging the user : ${error.message || error}`
          );
        }
      },
      validationSchema: signInValidations,
      enableReinitialize: true,
    });

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-[80%] 2xl:w-[70%] mx-auto flex flex-col items-center gap-3 lg:gap-5 mb-5 lg:mb-7"
    >
      <h2
        className="text-2xl lg:text-3xl bg-clip-text bg-gradient-to-r from-fuchsia-950 to-sky-700
       text-transparent text tracking-[1px] font-bold"
      >
        Sign In
      </h2>

      <div className="w-full flex flex-col items-start  gap-2  mt-4">
        <label className="text-base font-bold text-gray-400">
          Email Address
        </label>
        <input
          value={values["email"]}
          onChange={handleChange}
          onBlur={handleBlur}
          type="email"
          name="email"
          className="w-[80%] px-4 py-2 border border-sky-700/[.3] shadow-sm shadow-sky-700/[.4] focus:shadow-sky-700/[.8] duration-300 text-gray-300 rounded-md focus:outline-none outline-none"
          placeholder="you@example.com"
        />
        {touched["email"] && Boolean(errors["email"]) && (
          <span className="text-sm text-red-500">
            {String(errors["email"])}
          </span>
        )}
      </div>

      <div className="w-full flex flex-col items-start gap-2  mt-4">
        <label className="text-base font-bold text-gray-400">Password</label>
        <input
          type="password"
          name="password"
          value={values["passowrd"]}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-[80%] px-4 py-2 border border-sky-700/[.3] shadow-sm shadow-sky-700/[.4] focus:shadow-sky-700/[.8] duration-300 text-gray-300 rounded-md focus:outline-none outline-none"
          placeholder="••••••••"
        />

        {touched["password"] && Boolean(errors["password"]) && (
          <span className="text-sm text-red-500">
            {String(errors["password"])}
          </span>
        )}
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
