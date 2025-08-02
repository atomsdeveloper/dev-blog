import { Button } from "@/app/components/Button";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  return (
    <div className="py-16 text-6xl">
      <Button type="submit">Button</Button>
    </div>
  );
}
