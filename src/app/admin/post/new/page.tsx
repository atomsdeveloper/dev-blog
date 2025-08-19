// Components
import { Form } from "../../../admin/components/Form";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  return (
    <div className="py-16 text-6xl">
      <h1 className="text-xs">Criar Post</h1>
      <Form />
    </div>
  );
}
