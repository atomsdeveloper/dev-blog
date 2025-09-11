"use server";

import { IMAGE_UPLOADER_MAX_SIZE_VARIABLE } from "@/lib/constants";
import { checkLoginSession } from "@/lib/login/manage-login";

// Cloudinary
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type uploadImageActionProps = {
  url: string;
  error: string;
};

export async function uploadImageAction(
  formData: FormData
): Promise<uploadImageActionProps> {
  const hasUserLogged = checkLoginSession();

  const responseReturn = { url: "", error: "" };

  if (!hasUserLogged) {
    return { ...responseReturn, error: "Faça para continuar." };
  }

  if (!(formData instanceof FormData)) {
    return { ...responseReturn, error: "Dados inválidos." };
  }

  const file = formData.get("file");

  if (!file) {
    return { ...responseReturn, error: "Arquivo não encontrado." };
  }

  if (!(file instanceof File)) {
    return { ...responseReturn, error: "Arquivo inválido." };
  }

  if (file.size > IMAGE_UPLOADER_MAX_SIZE_VARIABLE) {
    return { ...responseReturn, error: "Imagem muito grande." };
  }

  if (!file.type.startsWith("image/")) {
    return { ...responseReturn, error: "Imagem inválida." };
  }

  // Covert file to base64
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64 = buffer.toString("base64");
  const dataURI = `data:${file.type};base64,${base64}`;

  try {
    const response = await cloudinary.uploader.upload(dataURI, {
      folder: "dev-blog",
    });

    const { secure_url } = response;
    return { ...responseReturn, url: secure_url, error: "" };
  } catch (err) {
    if (err instanceof Error) {
      return { ...responseReturn, error: err.message || "Error send file" };
    }
  }

  return {
    ...responseReturn,
  };
}
