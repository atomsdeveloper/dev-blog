// Next
import Link from "next/link";

export function Footer() {
  return (
    <footer className="p-8 mb-12 flex items-center justify-center text-slate-400 bg-slate-100">
      <div>
        <Link href="/">
          {" "}
          &copy; {new Date().getFullYear()} | Dev Blog. All rights reserved.
        </Link>
      </div>
    </footer>
  );
}
