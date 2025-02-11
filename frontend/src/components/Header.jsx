import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full flex items-center py-3 justify-between">
      <Link
        to={"/"}
        className="text-2xl font-bold tracking-[1px] text-sky-800 uppercase"
      >
        AUTH
      </Link>
    </header>
  );
}
