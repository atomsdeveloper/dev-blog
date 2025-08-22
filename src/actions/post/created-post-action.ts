"use server";

// Database
import { drizzleDatabase } from "@/db/drizzle";

// Data Transfer Object
import { postsTable } from "@/db/drizzle/schemas";
import { dtoPostNotNull, PostDataTransferObjectType } from "@/dto/post/dto";

// Check
import { PostCreateSchema } from "@/lib/post/check";

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
import { InstancePostRepository } from "@/repositories/post";

type CreatePostActionProps = {
  valuesFormState: PostDataTransferObjectType; // Valores recebidos
  errors: string[];
  success?: string;
};

export async function createdPostAction(
  prevState: CreatePostActionProps,
  formData: FormData // Valores enviados para serem salvos e manipulados.
): Promise<CreatePostActionProps> {
  console.log("Create Post");
  // TODO: Check has user logged.

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
    await InstancePostRepository.createPost(newPost);
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
