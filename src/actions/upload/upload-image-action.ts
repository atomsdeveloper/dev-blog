"use server";

import {
  IMAGE_SERVER_DOMAIN_VARIABLE,
  IMAGE_UPLOAD_DIRECTORY_VARIABLE,
  IMAGE_UPLOADER_MAX_SIZE_VARIABLE,
} from "@/lib/constants";
import { checkLoginSession } from "@/lib/login/manage-login";

import { mkdir, writeFile } from "fs/promises";
import { resolve } from "path";

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

  const generateImageName = `${Date.now()}_${file.name}`;

  // Generate path folder.
  const pathForUploadImage = resolve(
    process.cwd(),
    "public",
    IMAGE_UPLOAD_DIRECTORY_VARIABLE
  );

  // Created path folder. C:\Users\atoms\Documents\dev-blog\public\uploads
  await mkdir(pathForUploadImage, { recursive: true });

  const fileConvertBufferBytes = await file.arrayBuffer(); // Get bytes file.
  const buffer = Buffer.from(fileConvertBufferBytes); // Add bytes of file on buffer node.

  // Generate path folder with file create.
  const pathForUploadImagePlusFile = resolve(
    pathForUploadImage,
    generateImageName
  );

  // Write in folder the buffer file.
  await writeFile(pathForUploadImagePlusFile, buffer);

  // Generate URL to return client.
  const url = `${IMAGE_SERVER_DOMAIN_VARIABLE}/${generateImageName}`;

  return { ...responseReturn, url };
}
