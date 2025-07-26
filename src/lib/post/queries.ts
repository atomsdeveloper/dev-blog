// Repository Pattern
import { InstancePostRepository } from "@/repositories/post";

// React
import { cache } from "react";

// Function to find all published posts
// This function uses the repository to fetch posts that are published (publish: true)
// and caches the result for performance optimization.
// It returns a promise that resolves to an array of PostModel objects.
export const findAllPublishTrueCache = cache(async () => {
  return await InstancePostRepository.findAllPublishedTrue();
});

export const findPostBySlugCache = cache(async (slug: string) => {
  return await InstancePostRepository.findBySlugPublishedTrue(slug);
});

export const findPostByIdCache = cache(async (id: string) => {
  return await InstancePostRepository.findById(id);
});
