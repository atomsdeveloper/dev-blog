import slugify from "slugify";

import { makeRandomValue } from "./make-random-value";

export const makeRandomSlug = (text: string) => {
  const slug = slugify(text, {
    trim: true,
    strict: true,
    lower: true,
  });

  return `${slug}-${makeRandomValue()}`;
};
