import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function Layout() {
  return (
    <div className="w-full h-screen  bg-slate-950">
      <div className="w-[95%] md:w-[85%] lg:w-[80%] 2xl:w-[70%] mx-auto h-full overflow-y-auto">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
