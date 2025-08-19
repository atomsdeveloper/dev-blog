"use client";

// Components
import { Button } from "../../../components/Button";
import { InputCheckbox } from "../../../components/InputCheckbox";
import { InputText } from "../../../components/InputText";
import { MarkdownEditor } from "../../../components/MarkdownEditor";

// React
import { useState } from "react";
import { ImageUploader } from "../ImageUploader";

// Type
import { PostDataTransferObjectType } from "@/dto/post/dto";

type FormProps = {
  post?: PostDataTransferObjectType;
};

export function Form({ post }: FormProps) {
  const [contentValue, setContentValue] = useState(post?.content || "");

  return (
    <form action="" className="mt-8">
      <div className="flex flex-col gap-6">
        {/* Input Text Area / SLUG */}
        <InputText
          labelText="Slug do Post"
          name=""
          type="text"
          defaultValue={post?.slug || ""}
          readOnly
        />

        {/* Input Text Area / AUTHOR */}
        <InputText
          labelText="Autor do Post"
          name=""
          type="text"
          placeholder="Enter a author post."
          defaultValue={post?.author || ""}
        />

        {/* Input Text Area / TITLE */}
        <InputText
          labelText="Título do Post"
          name=""
          type="text"
          placeholder="Enter a title post."
          defaultValue={post?.title || ""}
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
          name="url"
          type="text"
          placeholder="Enter with URL of image"
          defaultValue={post?.coverImageUrl || ""}
        />

        {/* Input Checkbox / PUBLISHED */}
        <InputCheckbox
          type="checkbox"
          labelText="Publicar"
          checked={post?.published}
        />

        <Button variant="default" size="md" type="submit" className="w-full">
          Enviar
        </Button>
      </div>
    </form>
  );
}
