import { Button } from "@/app/components/Button";
import { BugIcon } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  return (
    <div className="py-16 text-6xl">
      <Button variant="default" size="sm" type="submit">
        <BugIcon />
        Button 0
      </Button>
      <Button variant="ghost" size="md" type="submit">
        <BugIcon />
        Button 1
      </Button>
      <Button variant="danger" size="lg" type="submit" disabled>
        <BugIcon />
        Button 2
      </Button>
    </div>
  );
}
