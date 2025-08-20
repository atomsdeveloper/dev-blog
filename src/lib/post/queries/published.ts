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

export const findPostByIdCache = cache((id: string) => {
  return unstable_cache(
    async (id: string) => {
      return await InstancePostRepository.findPostById(id).catch(
        () => undefined
      );
    },
    [`post-${id}`],
    { tags: [`post-${id}`] }
  )(id);
});
