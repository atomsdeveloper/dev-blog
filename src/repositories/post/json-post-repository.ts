// Model
import { PostModel } from "@/model/post/post-model";

// Repositories
import { PostRepository } from "./post-repository";

// Resolve
import { resolve } from "path";

// File System
import { readFile } from "fs/promises";

const ROOT_DIR = process.cwd();
const JSON_POSTS_FILE_PATH = resolve(
  ROOT_DIR,
  "src",
  "db",
  "seed",
  "posts.json"
); // Return a string path to the posts data file
const SIMULATE_AWAIT_PROMISE_IN_MS = 2500; // Simulate a delay for async operations

export class JsonPostRepository implements PostRepository {
  private async simulateAwait() {
    if (SIMULATE_AWAIT_PROMISE_IN_MS <= 0) {
      return;
    }

    await new Promise((resolve) =>
      setTimeout(resolve, SIMULATE_AWAIT_PROMISE_IN_MS)
    );
  }

  private async readFromDisk(): Promise<PostModel[]> {
    try {
      const JSON_CONTENT = await readFile(JSON_POSTS_FILE_PATH, "utf-8");

      if (!JSON_CONTENT) {
        throw new Error("No content found in posts file.");
      }
      const { posts } = JSON.parse(JSON_CONTENT); // String parsed from JSON content

      return posts;
    } catch (error) {
      throw error;
    }
  }

  async findAllPublishedTrue(): Promise<PostModel[]> {
    await this.simulateAwait(); // Simulate delay for async operation
    try {
      const posts = await this.readFromDisk();

      if (!posts) {
        throw new Error(`Post with Slug ${posts} not found.`);
      }

      return posts.filter((post) => post.published === true) as PostModel[];
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<PostModel[]> {
    await this.simulateAwait(); // Simulate delay for async operation
    try {
      const posts = await this.readFromDisk();

      if (!posts) {
        throw new Error(`Post with Slug ${posts} not found.`);
      }

      return posts as PostModel[];
    } catch (error) {
      throw error;
    }
  }

  async findBySlugPublishedTrue(slug: string): Promise<PostModel> {
    try {
      const posts = await this.findAllPublishedTrue();
      const postBySlug = posts.find((post) => post.slug === slug);

      if (!postBySlug) {
        throw new Error(`Post with Slug ${postBySlug} not found.`);
      }

      return postBySlug;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<PostModel> {
    try {
      const posts = await this.findAllPublishedTrue();
      const postById = posts.find((post) => post.id === id);

      if (!postById) {
        throw new Error(`Post with Id ${postById} not found.`);
      }

      return postById;
    } catch (error) {
      throw error;
    }
  }
}

// Example usage (uncomment to test):
// (async () => {
//   try {
//     const posts = await jsonPostRepository.findAll();
//     const post = await jsonPostRepository.findById("9eb8b7ac-2b48-4835-880a-a1c798e1a595");
//     posts.forEach((post) => {
//       console.log(`Post ID: ${post.id}, Title: ${post.title}`);
//     });
//
//     console.log("Post retrieved successfully:", post);
//     console.log("Posts retrieved successfully:", posts);
//   } catch (error) {
//     console.error("Error retrieving posts:", error);
//   }
// })();
