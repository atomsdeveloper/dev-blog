"use client";

// Components
import { Button } from "../../../components/Button";
import { InputCheckbox } from "../../../components/InputCheckbox";
import { InputText } from "../../../components/InputText";
import { MarkdownEditor } from "../../../components/MarkdownEditor";
import { ImageUploader } from "../ImageUploader";

// React
import { useActionState, useEffect, useState } from "react";

// Type
import { dtoPostNotNull, PostDataTransferObjectType } from "@/dto/post/dto";

// Action
import { createdPostAction } from "@/actions/post/created-post-action";
import { toast } from "react-toastify";

type FormProps = {
  post?: PostDataTransferObjectType;
};

export function Form({ post }: FormProps) {
  // TODO: Converte comments from portuguese for english.
  // Assim o state do form sempre é salvo com o último valor enviado e mantido dessa forma.
  // Aqui preciso chamar o dto novamente pois estes dados não são do componente e sim da server action que será executado juntamente com o hook 'useActionState' para salvar os dados em state da action, então, é necessário realizar o dto para os tipos do objeto não colidam.
  const initialState = {
    valuesFormState: dtoPostNotNull(post),
    errors: [],
  };

  const [state, action, isPending] = useActionState(
    createdPostAction,
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

  const { valuesFormState } = state;
  const [contentValue, setContentValue] = useState(post?.content || "");

  return (
    <form action={action} className="mt-8">
      <div className="flex flex-col gap-6">
        {/* Input Text Area / ID */}
        <InputText
          labelText="Id do Post"
          id="id"
          name="id"
          type="text"
          defaultValue={valuesFormState.id}
          placeholder={valuesFormState.id}
          disabled={true}
          readOnly
        />

        {/* Input Text Area / SLUG */}
        <InputText
          labelText="Slug do Post"
          id="slug"
          name="slug"
          type="text"
          placeholder={valuesFormState.slug}
          defaultValue={valuesFormState.slug}
          disabled={true}
          readOnly
        />

        {/* Input Text Area / AUTHOR */}
        <InputText
          labelText="Autor do Post"
          id="author"
          name="author"
          type="text"
          placeholder="Enter a author post."
          defaultValue={valuesFormState.author}
          disabled={isPending}
        />

        {/* Input Text Area / TITLE */}
        <InputText
          labelText="Título do Post"
          id="title"
          name="title"
          type="text"
          placeholder="Enter a title post."
          defaultValue={valuesFormState.title}
          disabled={isPending}
        />

        {/* Input Text Area / TITLE */}
        <InputText
          labelText="Excerpt do Post"
          id="excerpt"
          name="excerpt"
          type="text"
          placeholder="Enter a title post."
          defaultValue={valuesFormState.excerpt}
          disabled={isPending}
        />

        {/* Markdown Editor / MARKDOWN */}
        <MarkdownEditor
          labelText="Conteúdo"
          disabled={false}
          textAreaName="content"
          value={contentValue}
          setValue={setContentValue}
        />

        {/* Image Uploader / IMAGE UPLOAD*/}
        <ImageUploader />

        {/* Input Text Area / IMAGE URL */}
        <InputText
          labelText="URL da Imagem de Capa"
          id="url"
          name="url"
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
          id="published"
          disabled={isPending}
        />

        <Button disabled={isPending} type="submit" variant="default" size="md">
          Enviar
        </Button>
      </div>
    </form>
  );
}
