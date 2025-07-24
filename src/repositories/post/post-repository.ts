// Model
import { PostModel } from "@/model/post/post-model";

// Repository Pattern
export interface PostRepository {
  findAllPublishTrue(): Promise<PostModel[]>;
  findBySlug(slug: string): Promise<PostModel>;
  findById(id: string): Promise<PostModel>;
}
