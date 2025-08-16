"use client";

// Components
import { Button } from "@/app/components/Button";

// Constants
import { IMAGE_UPLOADER_MAX_SIZE } from "@/lib/constants";

// Icons
import { ImageUpIcon } from "lucide-react";

// Hooks
import { useRef } from "react";

// Toast
import { toast } from "react-toastify";

export const ImageUploader = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle click button to copy click for input.
  const handleClickButton = () => {
    if (inputRef.current === null) return;

    inputRef.current.click();
  };

  // Handle change value input for validate.
  const handleInputChangeValue = () => {
    if (inputRef.current === null) return;

    const fileValueInput = inputRef.current; // Get value current
    const file = fileValueInput?.files?.[0]; // Get of value current only file.

    if (!file) {
      toast.warning("Imagem não existe, Tente novamente!.");
      return;
    }

    if (file.size > IMAGE_UPLOADER_MAX_SIZE) {
      toast.warning(
        `Imagem é muito grande. O tamanho máximo é ${
          IMAGE_UPLOADER_MAX_SIZE / 1024 + "KB"
        }, Tente novamente!.`
      );

      fileValueInput.value = "";

      return;
    }

    // TODO: Create server action to send datas on click button.
    const formData = new FormData();
    formData.append("file", file);

    // Clear data of input send before datas.
    fileValueInput.value = "";
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
        onChange={handleInputChangeValue}
      />
    </div>
  );
};
