"use client";

import { uploadImageAction } from "@/actions/upload/upload-image-action";
// Components
import { Button } from "@/app/components/Button";

// Constants
import { IMAGE_UPLOADER_MAX_SIZE } from "@/lib/constants";

// Icons
import { ImageUpIcon } from "lucide-react";

// Hooks
import { useRef, useTransition } from "react";

// Toast
import { toast } from "react-toastify";

export const ImageUploader = () => {
  const [hasPending, startTransaction] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle click button to copy click for input.
  const handleClickButton = () => {
    if (inputRef.current === null) return;

    inputRef.current.click();
  };

  // Handle change value input for validate.
  const handleInputChangeValue = () => {
    toast.dismiss();
    toast.info("Enviando a sua imagem, aguarde...");

    if (inputRef.current === null) return;

    const fileValueInputCurrent = inputRef.current; // Get value current
    const file = fileValueInputCurrent?.files?.[0]; // Get of value current only file.

    if (!file) {
      toast.dismiss();
      toast.warning("Imagem não existe, Tente novamente!.");
      return;
    }

    if (file.size > IMAGE_UPLOADER_MAX_SIZE) {
      toast.dismiss();
      toast.warning(
        `Imagem é muito grande. O tamanho máximo é ${
          IMAGE_UPLOADER_MAX_SIZE / 1024 + "KB"
        }, Tente novamente!.`
      );

      fileValueInputCurrent.value = "";

      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    startTransaction(async () => {
      toast.dismiss();

      const response = await uploadImageAction(formData);

      if (response.error && response.url === "") {
        fileValueInputCurrent.value = "";
        toast.error(response.error);
      }

      toast.success(`Imagem enviada com sucesso. ${response.url}`);
    });

    fileValueInputCurrent.value = "";
  };
  return (
    <div className="flex flex-col gap-2 text-sm">
      <Button
        onClick={handleClickButton}
        size="md"
        type="button"
        variant="default"
        className="flex items-center disabled:cursor-none disabled:opacity-45"
        disabled={hasPending}
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
