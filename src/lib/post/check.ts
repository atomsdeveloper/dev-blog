import { z } from "zod";
import sanitizeHtml from "sanitize-html";
import { isUrlOrRelativePath } from "@/utils/is-url-or-relative-path";

const PostBaseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: "Título deve ter, no mínimo, 3 caracteres" })
    .max(120, { message: "Título deve ter no máximo 120 caracteres" }),

  content: z
    .string()
    .trim()
    .min(3, { message: "Conteúdo é obrigatório" })
    .transform((val) => sanitizeHtml(val))
    .optional()
    .default(""),

  author: z
    .string()
    .trim()
    .min(4, { message: "Autor precisa de um mínimo de 4 caracteres" })
    .max(100, {
      message: "Nome do autor não deve ter mais que 100 caracteres",
    }),

  excerpt: z
    .string()
    .trim()
    .min(3, { message: "Excerto precisa de um mínimo de 3 caracteres" })
    .max(200, { message: "Excerto não deve ter mais que 200 caracteres" }),

  coverImageUrl: z.string().trim().refine(isUrlOrRelativePath, {
    message:
      "URL da capa deve ser uma URL válida ou caminho relativo de imagem",
  }),

  published: z
    .preprocess((val) => {
      if (val === "on" || val === "true" || val === true) return true;
      return false;
    }, z.boolean())
    .default(false),
});

// Create schema (igual ao base por enquanto)
export const PostCreateSchema = PostBaseSchema;

// Update schema (pode expandir com extras)
export const PostUpdateSchema = PostBaseSchema.extend({
  // id: z.string().uuid("ID inválido"),
});

export type PostCreateInput = z.infer<typeof PostCreateSchema>;
export type PostUpdateInput = z.infer<typeof PostUpdateSchema>;
