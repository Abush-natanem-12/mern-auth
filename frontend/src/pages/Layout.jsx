import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="w-full h-screen bg-slate-950">
      <Outlet />
    </div>
  );
}
