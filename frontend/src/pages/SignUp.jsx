import { useState } from "react";
import { createAccount } from "../requests";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { signupValidations } from "../validations/inputValidations";

export default function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { errors, values, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      onSubmit: async (values) => {
        setLoading(true);
        await createAccount(values);
        setLoading(false);
        navigate("/");
      },
      validationSchema: signupValidations,
      enableReinitialize: true,
    });
  console.log(errors);
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-[80%] 2xl:w-[70%] mx-auto flex flex-col items-center gap-3 lg:gap-5 mb-5 lg:mb-7"
    >
      <h2
        className="text-2xl lg:text-3xl bg-clip-text bg-gradient-to-r from-fuchsia-950 to-sky-700
       text-transparent tracking-[1px] font-bold"
      >
        Create An account
      </h2>

      <div className="w-full flex flex-col items-start  gap-2  mt-4">
        <label className="text-base font-bold text-gray-400">Full Name</label>
        <input
          value={values["name"]}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="name"
          className="w-[80%] px-4 py-2 border border-sky-700/[.3] shadow-sm shadow-sky-700/[.4] focus:shadow-sky-700/[.8] duration-300 text-gray-300 rounded-md focus:outline-none outline-none"
          placeholder="John Doe"
        />

        {touched["name"] && Boolean(errors["name"]) && (
          <span className="text-sm text-red-500">{String(errors["name"])}</span>
        )}
      </div>

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

      <div className="w-full flex flex-col items-start  gap-2  mt-4">
        <label className="text-base font-bold text-gray-400">Password</label>
        <input
          value={values["password"]}
          onChange={handleChange}
          onBlur={handleBlur}
          type="password"
          name="password"
          className="w-[80%] px-4 py-2 border border-sky-700/[.3] shadow-sm shadow-sky-700/[.4] focus:shadow-sky-700/[.8] duration-300 text-gray-300 rounded-md focus:outline-none outline-none"
          placeholder="••••••••"
        />

        {touched["password"] && Boolean(errors["password"]) && (
          <span className="text-sm text-red-500">
            {String(errors["password"])}
          </span>
        )}
      </div>

      <div className="w-full flex flex-col items-start  gap-2  mt-4">
        <label className="text-base font-bold text-gray-400">Password</label>
        <input
          value={values["confirmPassword"]}
          onChange={handleChange}
          onBlur={handleBlur}
          type="password"
          name="confirmPassword"
          className="w-[80%] px-4 py-2 border border-sky-700/[.3] shadow-sm shadow-sky-700/[.4] focus:shadow-sky-700/[.8] duration-300 text-gray-300 rounded-md focus:outline-none outline-none"
          placeholder="••••••••"
        />

        {touched["confirmPassword"] && Boolean(errors["confirmPassword"]) && (
          <span className="text-sm text-red-500">
            {String(errors["confirmPassword"])}
          </span>
        )}
      </div>

      <button
        type="submit"
        className={`text-xl uppercase font-bold tracking-[1px] text-gray-400 bg-fuchsia-900/[.4] pl-3 ${
          loading ? "pr-10" : "pr-3"
        } py-2 rounded-xl hover:bg-fuchsia-900/[.7] duration-300 cursor-pointer relative`}
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
