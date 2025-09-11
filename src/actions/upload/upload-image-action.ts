"use server";

// Libs
import { IMAGE_UPLOADER_MAX_SIZE_VARIABLE } from "../../lib/constants";
import { checkLoginSession } from "../../lib/login/manage-login";
import cloudinary from "../../lib/cloudinary";

export type CloudinaryUploadResponseType = {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
};

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
  const base64 = Buffer.from(bytes).toString("base64");
  const dataURI = `data:${file.type};base64,${base64}`;

  try {
    const response: CloudinaryUploadResponseType =
      await cloudinary.uploader.upload(dataURI, {
        folder: "dev-blog",
      });

    const { secure_url } = response;
    return { ...responseReturn, url: secure_url, error: "" };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Error send file",
      url: "",
    };
  }
}
