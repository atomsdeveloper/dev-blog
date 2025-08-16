"use client";

// Icons
import { BugIcon } from "lucide-react";

// Components
import { Button } from "../../../components/Button";
import { InputCheckbox } from "../../../components/InputCheckbox";
import { InputText } from "../../../components/InputText";
import { MarkdownEditor } from "@/app/components/MarkdownEditor";

// React
import { useState } from "react";
import { ImageUploader } from "../ImageUploader";

export function Form() {
  const [contentValue, setContentValue] = useState("");

  return (
    <form action="" className="mb-6">
      <div className="py-16 text-6xl">
        {/* Buttons */}
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

        {/* Image Uploader */}
        <ImageUploader />

        {/* Markdown Editor */}
        <MarkdownEditor
          labelText="Conteúdo"
          disabled={false}
          textAreaName="content"
          value={contentValue}
          setValue={setContentValue}
        />

        {/* Input Text Area */}
        <InputText
          labelText="Write your post"
          type="text"
          placeholder="Enter text"
        />

        <InputText
          labelText=""
          type="text"
          placeholder="Enter other text"
          disabled
        />

        {/* Input Checkbox */}
        <InputCheckbox type="checkbox" labelText="Checkbox" />
      </div>

      <div className="mt-2">
        <Button variant="default" size="md" type="submit" className="w-full">
          Enviar
        </Button>
      </div>
    </form>
  );
}
