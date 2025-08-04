"use client";

// React
import { useEffect, useState } from "react";

// Next
import Link from "next/link";
import { usePathname } from "next/navigation";

// Icons
import {
  CircleXIcon,
  FileTextIcon,
  HouseIcon,
  MenuIcon,
  PenIcon,
} from "lucide-react";

export function Nav() {
  const [wasOpen, setWasOpen] = useState(false);
  const pathname = usePathname();

  // Close the menu when the pathname changes.
  useEffect(() => {
    setWasOpen(false);
  }, [pathname]);

  const classLinks = `h-10 shrink-0 [&>svg]:w-[16px] [&>svg]:h-[16px] px-4 flex items-center gap-2 rounded-lg transition hover:bg-slate-800 cursor-pointer`;

  return (
    <nav
      className={`bg-slate-900 text-slate-100 flex flex-col items-end sm:items-start rounded-lg sm:flex-row sm:flex-wrap
      ${!wasOpen && "h-10"}
      ${!wasOpen && "h-10"}
      ${!wasOpen && "overflow-hidden sm:overflow-visible sm:h-auto"}
    `}
    >
      <button
        className={`${classLinks} text-slate-300 italic sm:hidden`}
        onClick={() => setWasOpen(!wasOpen)}
      >
        {wasOpen ? (
          <CircleXIcon />
        ) : (
          <>
            <MenuIcon />
          </>
        )}
      </button>

      <ul className="flex flex-col sm:flex sm:flex-row sm:items-center sm:justify-start w-full">
        <li>
          <a href="/admin" className={classLinks}>
            <HouseIcon /> Home
          </a>
        </li>
        <li>
          <Link href="/admin/posts" className={classLinks}>
            <FileTextIcon /> Posts
          </Link>
        </li>
        <li>
          <Link href="/admin/posts/new" className={classLinks}>
            <PenIcon /> Criar
          </Link>
        </li>
      </ul>
    </nav>
  );
}
