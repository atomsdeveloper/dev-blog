// Model
import { PostModel } from "@/model/post/post-model";

// Repository Pattern
export interface PostRepository {
  findAllPublishedTrue(): Promise<PostModel[]>;
  findAll(): Promise<PostModel[]>;
  findBySlugPublishedTrue(slug: string): Promise<PostModel>;
  findBySlug(slug: string): Promise<PostModel>;
  findByIdPublishedTrue(id: string): Promise<PostModel>;
  findById(id: string): Promise<PostModel>;
}
