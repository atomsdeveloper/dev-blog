// Model
import { PostModel } from "@/model/post/post-model";

// Repository Pattern
export interface PostRepository {
  findPostById(id: string): Promise<PostModel>;
  findAllPublishedTrue(): Promise<PostModel[]>;
  findAll(): Promise<PostModel[]>;
  findBySlugPublishedTrue(slug: string): Promise<PostModel>;
  findBySlug(slug: string): Promise<PostModel>;
  findByIdPublishedTrue(id: string): Promise<PostModel>;
}
