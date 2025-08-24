"use server";

// Data Transfer Object
import { dtoPostNotNull, PostDataTransferObjectType } from "@/dto/post/dto";

// Check
import { PostUpdateSchema } from "@/lib/post/check";

// Next
import { revalidateTag } from "next/cache";

// Utils
import { getZodConvertErrorMessageArray } from "@/utils/get-zod-error-msg";
import { makeRandomValue } from "@/utils/make-random-value";

// Instance
import { updatedPostAdmin } from "@/lib/post/queries/admin";
import { extractField } from "@/utils/extract-post-id";
import { checkLoginSession } from "@/lib/login/manage-login";

type UpdatePostActionProps = {
  valuesFormState: PostDataTransferObjectType; // Valores recebidos
  errors: string[];
  success?: string;
};

export async function updatedPostAction(
  prevState: UpdatePostActionProps,
  formData: FormData // Valores enviados para serem salvos e manipulados.
): Promise<UpdatePostActionProps> {
  // TODO: Check has user logged.
  const hasUserLogged = checkLoginSession();

  if (!(formData instanceof FormData)) {
    return {
      valuesFormState: { ...prevState.valuesFormState },
      errors: ["Os dados recebidos são inválidos."],
    };
  }

  const convertFormDataEntriesTypeForObj = Object.fromEntries(
    formData.entries()
  );

  const postId = extractField<string>(formData, "id");
  console.log(postId);

  if (!postId) {
    throw new Error("Id não encontrado.");
  }

  // Remove fields of type File
  for (const key in convertFormDataEntriesTypeForObj) {
    if (convertFormDataEntriesTypeForObj[key] instanceof File) {
      delete convertFormDataEntriesTypeForObj[key];
    }
  }

  const returnZodCheckDatasForm = PostUpdateSchema.safeParse(
    convertFormDataEntriesTypeForObj
  );

  if (!hasUserLogged) {
    return {
      valuesFormState: dtoPostNotNull(convertFormDataEntriesTypeForObj),
      errors: ["Faça login em outra aba antes de salvar"],
    };
  }

  if (!returnZodCheckDatasForm.success) {
    const arrayErrorsZod = getZodConvertErrorMessageArray(
      returnZodCheckDatasForm.error.format()
    );

    return {
      errors: arrayErrorsZod,
      valuesFormState: dtoPostNotNull(convertFormDataEntriesTypeForObj),
    };
  }

  const checkAllDatasOk = returnZodCheckDatasForm.data;

  const newPost = {
    ...checkAllDatasOk,
  };

  let post;
  try {
    post = await updatedPostAdmin(postId, newPost);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        errors: [e.message],
        valuesFormState: dtoPostNotNull(post),
      };
    }
    return {
      errors: ["Id desconhecido"],
      valuesFormState: dtoPostNotNull(post),
    };
  }

  revalidateTag("posts");
  revalidateTag(`/admin/post/${postId}`);

  return {
    errors: [],
    valuesFormState: dtoPostNotNull(post),
    success: makeRandomValue(),
  };
}
