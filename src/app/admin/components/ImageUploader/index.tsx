"use client";

// Components
import { Button } from "@/app/components/Button";

// Constants
import { IMAGE_UPLOADER_MAX_SIZE_VARIABLE } from "@/lib/constants";

// Icons
import { ImageUpIcon } from "lucide-react";

// Hooks
import { useRef, useState, useTransition } from "react";

// Toast
import { toast } from "react-toastify";

// Next
import Image from "next/image";

type ImageUploaderProps = {
  disabled?: boolean;
  uploadAction: (
    formData: FormData
  ) => Promise<{ url: string; error?: string }>;
};
export const ImageUploader = ({
  disabled = false,
  uploadAction,
}: ImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasPending, startTransaction] = useTransition();
  const [hasImage, setHasImage] = useState<string>("");

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
      setHasImage("");
      return;
    }

    if (file.size > IMAGE_UPLOADER_MAX_SIZE_VARIABLE) {
      toast.dismiss();
      toast.warning(
        `Imagem é muito grande. O tamanho máximo é ${
          IMAGE_UPLOADER_MAX_SIZE_VARIABLE / 1024 + "KB"
        }, Tente novamente!.`
      );

      setHasImage("");

      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    startTransaction(async () => {
      toast.dismiss();

      const response = await uploadAction(formData);

      if (response.error && response.url === "") {
        toast.error(response.error);
        setHasImage("");
      }

      toast.success(`Imagem enviada com sucesso.`);

      setHasImage(response.url);
    });
  };

  console.log(hasImage);

  return (
    <div className="flex flex-col gap-2 text-sm ">
      <Button
        onClick={handleClickButton}
        size="md"
        type="button"
        variant="default"
        className="flex items-center disabled:cursor-none disabled:opacity-45"
        disabled={hasPending || disabled}
      >
        <ImageUpIcon />
        Selecionar imagem
      </Button>

      <input
        ref={inputRef}
        name="file"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInputChangeValue}
        disabled={hasPending || disabled}
      />

      {hasImage && (
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <b className="text-sm">URL:</b>
            <p
              className="text-sm text-muted-foreground"
              aria-description="Url da imagem enviada para o servidor"
            >
              {hasImage}
            </p>
          </div>

          <Image
            loader={({ src }) => src}
            src={hasImage}
            aria-description="Preview da imagem enviada para o servidor."
            alt="Imagem."
            width={100}
            height={100}
          />
        </div>
      )}
    </div>
  );
};
