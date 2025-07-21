// Next
import Link from "next/link";
import Image from "next/image";
import React from "react";

type PostCoverImageProps = {
  image: React.ComponentProps<typeof Image>;
  link: React.ComponentProps<typeof Link>;
};

export function PostCoverImage({ image, link }: PostCoverImageProps) {
  return (
    <Link
      {...link}
      {...(link.className ? { className: link.className } : {})}
      className="w-full h-full overflow-hidden rounded-xl"
    >
      <Image
        {...image}
        alt={image.alt || "Cover Image Last Post"}
        width={1200}
        height={720}
        {...(image.className ? { className: image.className } : {})}
        className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-300"
      />
    </Link>
  );
}

// Componet extensive for future use and flexibility
