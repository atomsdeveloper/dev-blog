import { PostModel } from "@/model/post/post-model";

// Type
export type PostDataTransferObjectType = Omit<PostModel, "updatedAt">;

// Function that receive post with type PostModel and return Data Transfer Object removing 'id', 'createdAt' and 'updatedAt'.
export const dtoPostNotNull = (
  post?: Partial<PostModel> // Partial transform all datas in optionals
): PostDataTransferObjectType => {
  return {
    id: post?.id || "",
    slug: post?.slug || "",
    title: post?.title || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    coverImageUrl: post?.coverImageUrl || "",
    published: post?.published || false,
    author: post?.author || "",
    createdAt: post?.createdAt || "",
  };
};

// Function that receive post with type PostModel and return Data Transfer Object removing 'id', 'createdAt' and 'updatedAt'.
export const dtoPost = (postModel: PostModel): PostDataTransferObjectType => {
  return dtoPostNotNull(postModel);
};
