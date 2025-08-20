import slugify from "slugify";
import { makeRandomValue } from "./make-random-value";

export const makeSlugTextString = (text: string) => {
  const slug = slugify(text, {
    lower: true,
    strict: true,
    trim: true,
  });

  return `${slug}-${makeRandomValue()}`;
};
