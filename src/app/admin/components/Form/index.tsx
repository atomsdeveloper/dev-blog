"use client";

// Components
import { Button } from "../../../components/Button";
import { InputCheckbox } from "../../../components/InputCheckbox";
import { InputText } from "../../../components/InputText";
import { MarkdownEditor } from "../../../components/MarkdownEditor";
import { ImageUploader } from "../ImageUploader";

// React
import { useActionState, useEffect, useState } from "react";

// Type and Data Transfer Object
import { dtoPostNotNull, PostDataTransferObjectType } from "@/dto/post/dto";

// Action
import { createdPostAction } from "@/actions/post/created-post-action";
import { updatedPostAction } from "@/actions/post/updated-post-action";

// Toast
import { toast } from "react-toastify";

// Next
import { useRouter, useSearchParams } from "next/navigation";

type FormPropsUpdatedPost = {
  mode: "updated";
  post: PostDataTransferObjectType;
  postId: string;
};

type FormPropsCreatedPost = {
  mode: "created";
};

type FormProps = FormPropsCreatedPost | FormPropsUpdatedPost;

export function Form(props: FormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const created = searchParams.get("created");

  let hasPostId;
  if (props.mode === "updated" && props.postId) {
    hasPostId = props.postId;
  }

  let post;
  const { mode } = props;
  if (mode === "updated") {
    post = props.post;
  }

  const initialState = {
    valuesFormState: dtoPostNotNull(post),
    errors: [],
    postId: hasPostId,
  };

  const actionMap = {
    created: createdPostAction,
    updated: updatedPostAction,
  };

  const [state, action, isPending] = useActionState(
    actionMap[mode],
    initialState
  );

  // Error
  useEffect(() => {
    if (state.errors.length > 0) {
      toast.dismiss();
      state.errors.forEach((error) => toast.error(error));
    }
  }, [state.errors]);

  // Update
  useEffect(() => {
    if (state.success) {
      toast.dismiss();
      toast.success("Post atualizado com sucesso!");
    }
  }, [state.success]);

  // Created
  useEffect(() => {
    if (created) {
      toast.dismiss();
      toast.success("Post criado com sucesso!");

      const url = new URL(window.location.href);
      url.searchParams.delete("created");
      router.replace(url.toString());
    }
  }, [created, router]);

  const { valuesFormState } = state;
  const [contentValue, setContentValue] = useState(post?.content || "");

  return (
    <form action={action} className="mt-8">
      <div className="flex flex-col gap-6">
        {/* Input Text Area / ID */}
        <InputText
          labelText="Id do Post"
          name="id"
          placeholder={"Id gerado pelo sistema."}
          type="text"
          defaultValue={hasPostId}
          disabled={isPending}
          readOnly
        />

        {/* Input Text Area / SLUG */}
        <InputText
          labelText="Slug do Post"
          name="slug"
          placeholder={"Slug gerada pelo sistema."}
          type="text"
          defaultValue={valuesFormState.slug}
          disabled={isPending}
          readOnly
        />

        {/* Input Text Area / AUTHOR */}
        <InputText
          labelText="Autor do Post"
          name="author"
          type="text"
          placeholder="Enter a author post."
          defaultValue={valuesFormState.author}
          disabled={isPending}
        />

        {/* Input Text Area / TITLE */}
        <InputText
          labelText="Título do Post"
          name="title"
          type="text"
          placeholder="Enter a title post."
          defaultValue={valuesFormState.title}
          disabled={isPending}
        />

        {/* Input Text Area / TITLE */}
        <InputText
          labelText="Excerpt do Post"
          name="excerpt"
          type="text"
          placeholder="Enter a title post."
          defaultValue={valuesFormState.excerpt}
          disabled={isPending}
        />

        {/* Markdown Editor / MARKDOWN */}
        <MarkdownEditor
          labelText="Conteúdo"
          disabled={isPending}
          textAreaName="content"
          value={contentValue}
          setValue={setContentValue}
        />

        {/* Image Uploader / IMAGE UPLOAD*/}
        <ImageUploader disabled={isPending} />

        {/* Input Text Area / IMAGE URL */}
        <InputText
          labelText="URL da Imagem de Capa"
          name="coverImageUrl"
          type="text"
          placeholder="Enter with URL of image"
          defaultValue={valuesFormState.coverImageUrl}
          disabled={isPending}
        />

        {/* Input Checkbox / PUBLISHED */}
        <InputCheckbox
          type="checkbox"
          labelText="Publicar"
          name="published"
          defaultChecked={valuesFormState.published}
          disabled={isPending}
        />

        <Button disabled={isPending} type="submit" variant="default" size="md">
          Enviar
        </Button>
      </div>
    </form>
  );
}
