// Model
import { PostModel } from "@/model/post/post-model";

// Repository Pattern
export interface PostRepository {
  findAllPublishTrue(): Promise<PostModel[]>;
  findById(id: string): Promise<PostModel>;
}
