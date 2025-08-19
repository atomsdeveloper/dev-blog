import { PostModel } from "@/model/post/post-model";

export type PostDataTransferObjectType = Omit<
  PostModel,
  "createdAt" | "updatedAt" | "id"
>;

// Function that receive post with type PostModel and return Data Transfer Object removing 'id' and 'updatedAt'.
export const postDataTransferObjectFn = (
  postModel: PostModel
): PostDataTransferObjectType => {
  return {
    slug: postModel?.slug,
    title: postModel?.title,
    excerpt: postModel?.excerpt,
    content: postModel?.content,
    coverImageUrl: postModel?.coverImageUrl,
    published: postModel?.published,
    author: postModel?.author,
  };
};
