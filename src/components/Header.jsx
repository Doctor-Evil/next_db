import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-between items-center p-3 mx-auto max-w-6xl">
      <ul className="flex gap-4">
        <li>
          <Link href={"/sign-in"}>Sign in</Link>
        </li>
        <li className="hidden md:block">
          <Link href={"/"}>Home</Link>
        </li>
        <li className="hidden md:block">
          <Link href={"/about"}>About</Link>
        </li>
      </ul>
      <Link href={"/"} className="flex items-center gap-1">
        <span className="text-2xl font-bold bg-amber-500 py-1 px-2 rounded-lg">ImDb</span>
        <span className="text-xl hidden sm:inline">Clone</span>
      </Link>
    </div>
  );
}
