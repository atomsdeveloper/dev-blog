// Repository Pattern
import { dtoPost, PostDataTransferObjectType } from "@/dto/post/dto";
import { PostModel } from "@/model/post/post-model";
import { InstancePostRepository } from "@/repositories/post";

// React
import { cache } from "react";

// Function to find all published posts
// This function uses the repository to fetch posts that are published (publish: true)
// and caches the result for performance optimization.
// It returns a promise that resolves to an array of PostModel objects.
export const findPostByIdCache = cache(async (id: string) => {
  return await InstancePostRepository.findPostById(id);
});

export const findAllPostCache = cache(async () => {
  return await InstancePostRepository.findAll();
});

export const deletePostAdmin = async (id: string) => {
  return await InstancePostRepository.deletePost(id);
};

export const createdPostAdmin = async (post: PostModel) => {
  return await InstancePostRepository.createPost(post);
};

export const updatedPostAdmin = async (
  id: string,
  post: Omit<PostModel, "id" | "slug" | "createdAt" | "updateAt">
) => {
  return await InstancePostRepository.updatePost(id, post);
};
