"use server";

// Data Transfer Object
import { drizzleDatabase } from "@/db/drizzle";
import { postsTable } from "@/db/drizzle/schemas";
import { dtoPostNotNull, PostDataTransferObjectType } from "@/dto/post/dto";

// Check
import { PostCreateSchema } from "@/lib/post/check";

// Model
import { PostModel } from "@/model/post/post-model";

// Utils
import { getZodConvertErrorMessageArray } from "@/utils/get-zod-error-msg";
import { makeSlugTextString } from "@/utils/make-slug-text-string";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

//
import { v4 as uuid } from "uuid";

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

  const returnZodCheckDatasForm = PostCreateSchema.safeParse(
    convertFormDataEntriesTypeForObj
  );

  if (!returnZodCheckDatasForm.success) {
    const arrayErrorsZod = getZodConvertErrorMessageArray(
      returnZodCheckDatasForm.error.format()
    ).filter(Boolean);

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
    slug: makeSlugTextString(checkAllDatasOk.title),
  };

  // TODO: Move action that manipulate the removing of posts. /repositories/post/drizzle-post-repository.ts
  await drizzleDatabase.insert(postsTable).values(newPost);

  revalidateTag("posts");
  redirect(`/post/${newPost.id}`);
}
