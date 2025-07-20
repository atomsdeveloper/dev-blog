// Model
import { PostModel } from "@/model/post/post-model";

// Repository Pattern
export interface PostRepository {
  findAll(): Promise<PostModel[]>;
}
