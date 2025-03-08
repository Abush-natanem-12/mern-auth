import { useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function VerifyAccountPage() {
  const [inputs, setInputs] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (/^\d$/.test(value)) {
      const newDigits = [...inputs];
      newDigits[index] = value;
      setInputs(newDigits);

      // Move to next input if it's not the last one
      if (index < inputs.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const newDigits = [...inputs];

      if (inputs[index]) {
        // Clear the current input if not empty
        newDigits[index] = "";
      } else if (index > 0) {
        // Move focus to the previous input and clear it
        newDigits[index - 1] = "";
        inputsRef.current[index - 1]?.focus();
      }

      setInputs(newDigits);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    if (/^\d{6}$/.test(pastedData)) {
      const newDigits = pastedData.split("");
      setInputs(newDigits);

      // Move focus to the last input
      inputsRef.current[5]?.focus();
    }
  };

  return (
    <div className="w-full md:w-[80%] 2xl:w-[70%] mx-auto flex flex-col items-center py-5 gap-4">
      <h1
        className="text-xl lg:text-2xl font-bold bg-clip-text bg-gradient-to-r from-fuchsia-950 to-sky-700
       text-transparent"
      >
        Verify Your Account Here
      </h1>
      <p className="text-base lg:text-xl font-bold tracking-[1px] text-gray-300">
        Enter the six-digit code we sent to your email address
      </p>

      <form className="flex flex-col items-center gap-8" onPaste={handlePaste}>
        <div className="w-full flex items-center justify-center gap-3">
          {inputs.map((input, index) => (
            <input
              key={index}
              type="text"
              value={input}
              inputMode="numeric"
              maxLength={1}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (inputsRef.current[index] = el)}
              className="size-10 lg:size-12 border-[2px] border-fuchsia-900/[.2] outline-none rounded-md shadow-md shadow-fuchsia-900/[.4] text-xl text-white text-center"
            />
          ))}
        </div>

        <button
          type="submit"
          className="text-base lg:text-xl font-bold tracking-[1px] text-gray-50 bg-fuchsia-800 hover:bg-fuchsia-900 px-2 py-1 
          rounded-md cursor-pointer"
        >
          Verify Account
        </button>
      </form>

      <div className="flex items-center gap-4">
        <span className="text-base lg:text-xl font-bold tracking-[1px] text-gray-200">
          Didnt get the code ?
        </span>

        <button className="text-base lg:text-xl font-bold tracking-[1px] text-fuchsia-900">
          Send Again
        </button>
      </div>
      <Link
        to="/auth/sign-in"
        className="text-sky-700 text-base font-bold tracking-[1px] self-start"
      >
        Back to Sign In
      </Link>
    </div>
  );
}
