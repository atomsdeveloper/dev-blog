// Repository
import { JsonPostRepository } from "@/repositories/post/json-post-repository";

// Drizzle
import { drizzleDatabase } from ".";

// Schemas
import { postsTable } from "./schemas";

(async () => {
  const jsonPostRepository = new JsonPostRepository();
  const posts = await jsonPostRepository.findAll();

  try {
    await drizzleDatabase.insert(postsTable).values(posts);
    console.log(`Successfull Insert ${posts.length} Data in Database`);
  } catch {
    console.log("Internal Database Error - Insert Method");
  }
})();
