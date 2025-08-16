"use client";

// Components
import { Button } from "@/app/components/Button";
import { ImageUpIcon } from "lucide-react";

// Hooks
import { useRef } from "react";

export const ImageUploader = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickButton = () => {
    if (inputRef.current === null) return;

    inputRef.current.click();
  };
  return (
    <div className="flex flex-col gap-2 text-sm">
      <Button
        onClick={handleClickButton}
        size="md"
        type="button"
        variant="default"
        className="flex items-center"
      >
        <ImageUpIcon />
        Selecionar uma imagem
      </Button>

      <input
        ref={inputRef}
        name="file"
        type="file"
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};
