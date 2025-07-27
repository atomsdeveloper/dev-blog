// Repository Pattern
import { InstancePostRepository } from "@/repositories/post";

// React
import { cache } from "react";

// Function to find all published posts
// This function uses the repository to fetch posts that are published (publish: true)
// and caches the result for performance optimization.
// It returns a promise that resolves to an array of PostModel objects.
export const findPostByIdCache = cache(async (id: string) => {
  return await InstancePostRepository.findById(id);
});

export const findAllPostCache = cache(async () => {
  return await InstancePostRepository.findAll();
});
