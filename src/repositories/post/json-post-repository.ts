// Model
import { PostModel } from "@/model/post/post-model";

// Repositories
import { PostRepository } from "./post-repository";

// Resolve
import { resolve } from "path";

// File System
import { readFile } from "fs/promises";

// Constants
import { SIMULATE_AWAIT_PROMISE_IN_MS_VARIABLE } from "@/lib/constants";

const ROOT_DIR = process.cwd();
const JSON_POSTS_FILE_PATH = resolve(
  ROOT_DIR,
  "src",
  "db",
  "seed",
  "posts.json"
); // Return a string path to the posts data file

export class JsonPostRepository
  implements Omit<PostRepository, "createPost" | "updatePost" | "deletePost">
{
  async findPostBySlug(slug: string): Promise<PostModel> {
    throw new Error("Method not implemented." + `${slug}`);
  }

  async findByIdPublishedTrue(id: string): Promise<PostModel> {
    throw new Error("Method not implemented." + `${id}`);
  }

  private async simulateAwait() {
    if (SIMULATE_AWAIT_PROMISE_IN_MS_VARIABLE <= 0) {
      return;
    }

    await new Promise((resolve) =>
      setTimeout(resolve, SIMULATE_AWAIT_PROMISE_IN_MS_VARIABLE)
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

  async findPostById(id: string): Promise<PostModel> {
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
