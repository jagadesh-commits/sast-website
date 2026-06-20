import Image from "next/image";

export const BLOG_IMAGE_ASPECT = "1024/682" as const;

type BlogPostImageProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export function BlogPostImage({ src, alt, sizes, priority, className = "" }: BlogPostImageProps) {
  return (
    <div className={`relative aspect-[1024/682] overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-contain" />
    </div>
  );
}
