// Next
import { Link } from "lucide-react";

export function Nav() {
  return (
    <nav>
      {/* Navigation items go here */}
      <ul>
        <li>
          <a href="/admin">Home</a>
        </li>
        <li>
          <Link href="/admin/posts">Posts</Link>
        </li>
      </ul>
    </nav>
  );
}
