// Components
import { Form } from "../../../admin/components/Form";

// Next
import { Metadata } from "next";

// Metadata
export const metadata: Metadata = {
  title: "Criar Post",
};

// Action
import { createdPostAction } from "../../../../actions/post/created-post-action";
import { uploadImageAction } from "../../../../actions/upload/upload-image-action";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mt-6">Criar Post</h1>
      <Form
        mode="created"
        createPost={createdPostAction}
        uploadImageAction={uploadImageAction}
      />
    </>
  );
}
