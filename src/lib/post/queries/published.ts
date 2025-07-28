// Repository Pattern
import { InstancePostRepository } from "@/repositories/post";
import { unstable_cache } from "next/cache";

// React
import { cache } from "react";

// Function to find all published posts
// This function uses the repository to fetch posts that are published (publish: true)
// and caches the result for performance optimization.
// It returns a promise that resolves to an array of PostModel objects.
export const findAllPublishTrueCache = cache(async () => {
  unstable_cache(
    async () => {
      return await InstancePostRepository.findAllPublishedTrue().catch(
        () => undefined
      );
    },
    ["posts"],
    { tags: ["posts"] }
  );
});

export const findPostBySlugPublishedTrueCache = cache((slug: string) => {
  return unstable_cache(
    async (slug: string) => {
      return await InstancePostRepository.findBySlugPublishedTrue(slug).catch(
        () => undefined
      );
    },
    [`post-${slug}`],
    { tags: [`post-${slug}`] }
  )(slug);
});
