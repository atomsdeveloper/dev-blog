// Model
import { PostModel } from "@/model/post/post-model";

// Database
import { drizzleDatabase } from "@/db/drizzle";

// Schemas
import { postsTable } from "@/db/drizzle/schemas";

// Repository
import { PostRepository } from "./post-repository";

// Functions Database
import { eq, desc, and } from "drizzle-orm";

export class DrizzlePostRepository implements PostRepository {
  // Return all posts with published equal true and order by desc
  async findAllPublishedTrue(): Promise<PostModel[]> {
    const query = drizzleDatabase.select().from(postsTable);
    const posts = await query
      .where(eq(postsTable.published, true))
      .orderBy(desc(postsTable.createdAt));

    if (!posts) {
      throw new Error("Post cannot be found.");
    }

    return posts;
  }
  // Return all posts
  async findAll(): Promise<PostModel[]> {
    const query = drizzleDatabase.select().from(postsTable);
    const posts = await query.orderBy(desc(postsTable.createdAt));

    if (!posts) {
      throw new Error("Post cannot be found.");
    }

    return posts;
  }
  // Return all posts with slug
  async findBySlug(slug: string): Promise<PostModel> {
    const query = drizzleDatabase.select().from(postsTable);
    const posts = await query.where(and(eq(postsTable.slug, slug)));

    if (!posts) {
      throw new Error("Post cannot be found.");
    }

    return posts[0];
  }
  // Return all posts with slug and published equal true
  async findBySlugPublishedTrue(slug: string): Promise<PostModel> {
    const query = drizzleDatabase.select().from(postsTable);
    const posts = await query.where(
      and(eq(postsTable.slug, slug), eq(postsTable.published, true))
    );

    if (!posts) {
      throw new Error("Post cannot be found.");
    }

    return posts[0];
  }
  // Return all posts with id
  async findById(id: string): Promise<PostModel> {
    const query = drizzleDatabase.select().from(postsTable);
    const posts = await query.where(and(eq(postsTable.id, id)));

    if (!posts) {
      throw new Error("Post cannot be found.");
    }

    return posts[0];
  }
  // Return all posts with id and published equal true
  async findByIdPublishedTrue(id: string): Promise<PostModel> {
    const query = drizzleDatabase.select().from(postsTable);
    const posts = await query.where(
      and(eq(postsTable.id, id), eq(postsTable.published, true))
    );

    if (!posts) {
      throw new Error("Post cannot be found.");
    }

    return posts[0];
  }
}
