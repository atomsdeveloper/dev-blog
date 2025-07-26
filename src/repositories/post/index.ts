// Methods Repository
import { DrizzlePostRepository } from "./drizzle-post-repository";

// Interface
import { PostRepository } from "./post-repository";

// Singleton Pattern
// This allows us to use the same instance of the repository throughout the application
// This is useful for maintaining a single source of truth for the posts data
// Should be used in the application where the repository can change
// ...and we want to ensure that the same instance is used everywhere.
export const jsonPostRepository: PostRepository = new DrizzlePostRepository();
