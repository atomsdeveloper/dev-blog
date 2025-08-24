"use server";

import {
  dtoPost,
  dtoPostNotNull,
  PostDataTransferObjectType,
} from "@/dto/post/dto";

// Check
import { PostCreateSchema } from "@/lib/post/check";

// Action
import { createdPostAdmin } from "@/lib/post/queries/admin";

// Model
import { PostModel } from "@/model/post/post-model";

// Utils
// import { getZodConvertErrorMessageArray } from "@/utils/get-zod-error-msg";
import { makeRandomSlug } from "../../utils/make-random-slug";

// Next
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

// UUID
import { v4 as uuid } from "uuid";
import { getZodConvertErrorMessageArray } from "@/utils/get-zod-error-msg";

// Manage user
import { checkLoginSession } from "@/lib/login/manage-login";

type CreatePostActionProps = {
  valuesFormState: PostDataTransferObjectType; // Valores recebidos
  errors: string[];
  success?: string;
};

export async function createdPostAction(
  prevState: CreatePostActionProps,
  formData: FormData // Valores enviados para serem salvos e manipulados.
): Promise<CreatePostActionProps> {
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

  // Remove fields of type File
  for (const key in convertFormDataEntriesTypeForObj) {
    if (convertFormDataEntriesTypeForObj[key] instanceof File) {
      delete convertFormDataEntriesTypeForObj[key];
    }
  }

  const returnZodCheckDatasForm = PostCreateSchema.safeParse(
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

  const newPost: PostModel = {
    ...checkAllDatasOk,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: uuid(),
    slug: makeRandomSlug(checkAllDatasOk.title),
  };

  try {
    await createdPostAdmin(newPost);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        errors: [e.message],
        valuesFormState: newPost,
      };
    }
    return {
      errors: ["Erro desconhecido"],
      valuesFormState: newPost,
    };
  }

  revalidateTag("posts");
  redirect(`/admin/post/${newPost.id}?created=true`);
}
