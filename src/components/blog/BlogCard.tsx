import Image from "next/image";
import type { BlogPost } from "@/types";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
      <Image
        src={post.image}
        alt={post.title}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      <p className="absolute inset-x-0 bottom-0 p-5 text-[18px] font-bold leading-snug text-white">
        {post.title}
      </p>
    </div>
  );
}
