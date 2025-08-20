// Repository Pattern
import { InstancePostRepository } from "@/repositories/post";

// Next
import { unstable_cache } from "next/cache";

// React
import { cache } from "react";

// This function uses the repository to fetch posts that are published (publish: true)
// and caches the result for performance optimization.
// It returns a promise that resolves to an array of PostModel objects.
export const findAllPublishedTrueCache = cache(async () => {
  return unstable_cache(
    async () => {
      return await InstancePostRepository.findAllPublishedTrue().catch(
        () => undefined
      );
    },
    ["posts"],
    { tags: ["posts"] }
  )();
});

export const findPostBySlugCache = cache((slug: string) => {
  return unstable_cache(
    async (slug: string) => {
      return await InstancePostRepository.findPostBySlug(slug).catch(
        () => undefined
      );
    },
    [`post-${slug}`],
    { tags: [`post-${slug}`] }
  )(slug);
});
