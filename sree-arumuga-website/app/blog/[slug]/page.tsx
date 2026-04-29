import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blog-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return { title: "Blog Post" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Sree Arumuga Steel Trading" }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ["/twitter-image"],
    },
  };
}

export default async function SingleBlogPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();

  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

  const shareText = encodeURIComponent(post.title);
  const shareUrl = encodeURIComponent(`https://sreearumugasteel.in/blog/${post.slug}`);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Organization", name: "Sree Arumuga Steel Trading Private Limited" },
    publisher: {
      "@type": "Organization",
      name: "Sree Arumuga Steel Trading Private Limited",
      logo: { "@type": "ImageObject", url: "https://sreearumugasteel.in/Logo.png" },
    },
    mainEntityOfPage: `https://sreearumugasteel.in/blog/${post.slug}`,
  };

  return (
    <article className="bg-white">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="relative h-[340px] overflow-hidden rounded-3xl">
          <Image src="/machine2.png" alt="" fill sizes="100vw" className="object-cover" priority />
        </div>

        <span className="mt-8 inline-flex rounded-full bg-[var(--primary-blue)]/10 px-3 py-1 text-xs font-bold text-[var(--primary-blue)]">
          {post.category}
        </span>
        <h1 className="mt-4 text-4xl font-black leading-tight text-[var(--primary-blue)] md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-sm text-zinc-500">
          {post.author} | {post.date} | {post.readTime}
        </p>

        <div className="prose prose-zinc mt-10 max-w-none">
          {post.content.map((paragraph) => (
            <p key={paragraph} className="mb-4 text-lg leading-8 text-zinc-700">
              {paragraph}
            </p>
          ))}
          <blockquote className="my-8 border-l-4 border-[var(--primary-blue)] bg-[var(--primary-blue)]/5 px-5 py-4 text-xl font-semibold text-[var(--primary-blue)]">
            {post.quote}
          </blockquote>
          <p className="text-lg leading-8 text-zinc-700">
            For project-specific guidance, our team can help you align product selection with budget,
            timeline, and technical requirements.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-zinc-500">Share:</span>
          <a
            href={`https://wa.me/919940119914?text=${shareText}%20${shareUrl}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700"
          >
            WhatsApp
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700"
          >
            LinkedIn
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700"
          >
            Facebook
          </a>
        </div>
      </div>

      <section className="bg-[#f9f9f9] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-black text-[var(--primary-blue)]">Related Posts</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <article key={item.slug} className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold text-[var(--primary-blue)]">{item.category}</p>
                <h3 className="mt-2 text-xl font-bold text-[var(--primary-blue)]">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-600">{item.excerpt}</p>
                <Link href={`/blog/${item.slug}`} className="mt-4 inline-flex text-sm font-semibold text-[var(--primary-blue)]">
                  Read More →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
