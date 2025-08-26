"use server";

// Data Transfer Object
import { dtoPostNotNull, PostDataTransferObjectType } from "@/dto/post/dto";

// Next
import { revalidateTag } from "next/cache";

// Utils
import { getZodConvertErrorMessageArray } from "@/utils/get-zod-error-msg";
import { makeRandomValue } from "@/utils/make-random-value";
import { extractId } from "@/utils/extract-post-id";

// Instance
import { PostUpdateSchema } from "@/lib/post/check";
import { updatedPostAdmin } from "@/lib/post/queries/admin";
import { checkLoginSession } from "@/lib/login/manage-login";

type UpdatePostActionProps = {
  valuesFormState: PostDataTransferObjectType;
  errors: string[];
  success?: string;
};

export async function updatedPostAction(
  prevState: UpdatePostActionProps & { postId?: string },
  formData: FormData // Valores enviados para serem salvos e manipulados.
): Promise<UpdatePostActionProps> {
  const hasUserLogged = checkLoginSession();

  if (!(formData instanceof FormData)) {
    return {
      valuesFormState: { ...prevState.valuesFormState },
      errors: ["Os dados recebidos são inválidos."],
    };
  }

  const id = extractId(formData) || prevState.postId;

  console.log(id);

  if (!id || typeof id !== "string") {
    return {
      valuesFormState: { ...prevState.valuesFormState },
      errors: ["ID não encontrado"],
    };
  }

  const convertFormDataEntriesTypeForObj = Object.fromEntries(
    formData.entries()
  );

  // Check fields of type File and remove type.
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
    post = await updatedPostAdmin(id, newPost);
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

  revalidateTag(`/admin/post/${id}`);
  revalidateTag("posts");

  return {
    errors: [],
    valuesFormState: dtoPostNotNull(post),
    success: makeRandomValue(),
  };
}
