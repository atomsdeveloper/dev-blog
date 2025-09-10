// Repository
import { JsonPostRepository } from "@/repositories/post/json-post-repository";

// Drizzle
import { drizzleDatabase } from ".";

// Schemas
import { postsTable } from "./schemas";

(async () => {
  const jsonPostRepository = new JsonPostRepository();
  const posts = await jsonPostRepository.findAll();

  const formattedPosts = posts.map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt, // verifique se o JSON tem 'excert' vs 'excerpt'
    author: post.author,
    content: post.content,
    coverImageUrl: post.coverImageUrl,
    published: Boolean(post.published),
    createdAt: post.createdAt ? new Date(post.createdAt) : new Date(),
    updatedAt: post.updatedAt ? new Date(post.updatedAt) : new Date(),
  }));

  try {
    await drizzleDatabase.insert(postsTable).values(formattedPosts);
    console.log(`Successfull Insert ${posts.length} Data in Database`);
  } catch {
    console.log("Internal Database Error - Insert Method");
  }
})();
