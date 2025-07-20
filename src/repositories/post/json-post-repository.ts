// Model
import { PostModel } from "@/model/post/post-model";

// Repositories
import { PostRepository } from "./post-repository";

const ROOT_DIR = process.cwd();

export class JsonPostRepository implements PostRepository {
  private async readFromDisk() {}

  async findAll(): Promise<PostModel[]> {}
}

// Singleton Pattern
export const jsonPostRepository = new JsonPostRepository();
