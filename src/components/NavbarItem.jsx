'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarItem({title, param}) {
    const pathname = usePathname().split('/')[1];

  return (
    <div>
        <Link
            href={`/${param}`}
            className={`${
            pathname.includes(param.toLowerCase()) ? "text-amber-500 underline" : "hover:text-amber-500"
            } transition-colors duration-300`}
        >
            {title}
        </Link>
    </div>
  );
}