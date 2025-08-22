// Model
import { PostModel } from "@/model/post/post-model";

// Repository Pattern
export interface PostRepository {
  findPostById(id: string): Promise<PostModel>;
  findAllPublishedTrue(): Promise<PostModel[]>;
  findAll(): Promise<PostModel[]>;
  findBySlugPublishedTrue(slug: string): Promise<PostModel>;
  findPostBySlug(slug: string): Promise<PostModel>;
  findByIdPublishedTrue(id: string): Promise<PostModel>;

  // Mutation
  createPost(post: PostModel): Promise<PostModel>;
  deletePost(id: string): Promise<PostModel>;
  updatePost(
    id: string,
    newPostDatas: Omit<PostModel, "id" | "slug" | "createdAt" | "updatedAt">
  ): Promise<Omit<PostModel, "id" | "slug" | "createdAt" | "updatedAt">>;
}
