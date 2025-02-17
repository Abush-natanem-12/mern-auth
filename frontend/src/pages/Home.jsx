import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="w-full pt-6 flex flex-col items-center gap-5">
      <h1
        className="text-center text-2xl lg:text-3xl font-bold bg-clip-text bg-gradient-to-r from-fuchsia-950 to-sky-700
       text-transparent "
      >
        Hello Welcome To simpleAuth
      </h1>

      <img
        className="w-[100%] sm:w-[95%] md:w-[50%] 2xl:w-[40%]"
        src="/home.png"
        alt="home page greeting"
      />

      <p className="text-center text-base lg:text-xl font-bold tracking-[1px] text-gray-200">
        This is Simple, Complete MERN authentication build with Express and
        mongo db
      </p>

      <div className="flex items-center gap-2">
        <span className="text-base lg:text-xl tracking-[1px] text-gray-200">
          Created by
        </span>
        <Link
          to={"https://github.com/klaus-creations"}
          className="text-base lg:text-xl tracking-[1px] text-fuchsia-900 font-bold"
        >
          Klaus_Creations
        </Link>
      </div>
    </div>
  );
}
