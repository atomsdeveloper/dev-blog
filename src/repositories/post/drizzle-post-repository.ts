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

// Delay
import { asyncDelay } from "@/utils/async-delay";
import { SIMULATE_AWAIT_PROMISE_IN_MS_VARIABLE } from "@/lib/constants";

export class DrizzlePostRepository implements PostRepository {
  // Return all posts with published equal true and order by desc
  async findAllPublishedTrue(): Promise<PostModel[]> {
    asyncDelay(SIMULATE_AWAIT_PROMISE_IN_MS_VARIABLE, true);

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
    asyncDelay(SIMULATE_AWAIT_PROMISE_IN_MS_VARIABLE, true);

    const query = drizzleDatabase.select().from(postsTable);
    const posts = await query.orderBy(desc(postsTable.createdAt));

    if (!posts) {
      throw new Error("Post cannot be found.");
    }

    return posts;
  }
  // Return all posts with slug
  async findPostBySlug(slug: string): Promise<PostModel> {
    asyncDelay(SIMULATE_AWAIT_PROMISE_IN_MS_VARIABLE, true);

    const query = drizzleDatabase.select().from(postsTable);
    const posts = await query.where(and(eq(postsTable.slug, slug)));

    if (!posts) {
      throw new Error("Post cannot be found.");
    }

    return posts[0];
  }
  // Return all posts with slug and published equal true
  async findBySlugPublishedTrue(slug: string): Promise<PostModel> {
    asyncDelay(SIMULATE_AWAIT_PROMISE_IN_MS_VARIABLE, true);

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
  async findPostById(id: string): Promise<PostModel> {
    asyncDelay(SIMULATE_AWAIT_PROMISE_IN_MS_VARIABLE, true);

    const query = drizzleDatabase.select().from(postsTable);
    const posts = await query.where(and(eq(postsTable.id, id)));

    if (!posts) {
      throw new Error("Post cannot be found.");
    }

    return posts[0];
  }
  // Return all posts with id and published equal true
  async findByIdPublishedTrue(id: string): Promise<PostModel> {
    asyncDelay(SIMULATE_AWAIT_PROMISE_IN_MS_VARIABLE, true);

    const query = drizzleDatabase.select().from(postsTable);
    const posts = await query.where(
      and(eq(postsTable.id, id), eq(postsTable.published, true))
    );

    if (!posts) {
      throw new Error("Post cannot be found.");
    }

    return posts[0];
  }

  // MUTATIONS
  async createPost(post: PostModel): Promise<PostModel> {
    const hasPost = await drizzleDatabase.query.posts.findFirst({
      where: (posts, { eq, or }) =>
        or(eq(posts.id, post.id), eq(posts.slug, post.slug)),
      columns: { id: true },
    });

    if (!!hasPost) {
      throw new Error("Post ou Id já existem.");
    }

    const newPost = await drizzleDatabase
      .insert(postsTable)
      .values(post)
      .returning();

    return newPost[0];
  }

  async deletePost(id: string): Promise<PostModel> {
    const hasPost = await drizzleDatabase.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!hasPost) {
      throw new Error("Post não existe.");
    }

    const deletedPost = await drizzleDatabase
      .delete(postsTable)
      .where(eq(postsTable.id, id))
      .returning();

    return deletedPost[0];
  }

  async updatePost(
    id: string,
    newPostDatas: Omit<PostModel, "id" | "slug" | "createdAt" | "updatedAt">
  ): Promise<PostModel> {
    const oldPost = await drizzleDatabase.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!oldPost) {
      throw new Error("Post não existe");
    }

    const updatedAt = new Date().toISOString();
    const newPost = {
      title: newPostDatas.title,
      excerpt: newPostDatas.excerpt,
      content: newPostDatas.content,
      coverImageUrl: newPostDatas.coverImageUrl,
      published: newPostDatas.published,
      author: newPostDatas.author,
      updatedAt,
    };

    await drizzleDatabase
      .update(postsTable)
      .set(newPost)
      .where(eq(postsTable.id, id))
      .returning();

    return {
      ...oldPost,
      ...newPostDatas,
    };
  }
}
