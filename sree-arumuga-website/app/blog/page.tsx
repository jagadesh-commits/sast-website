import type { Metadata } from "next";
import { BlogGrid } from "@/components/blog-grid";
import { blogPosts } from "@/lib/blog-data";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Steel industry news, company updates and product guides from Sree Arumuga Steel Trading Private Limited.",
};

export default function BlogPage() {
  return (
    <div>
      <section className="bg-[var(--primary-blue)] px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-5xl font-black md:text-6xl">Insights &amp; Updates</h1>
          <div className="mt-4 h-1 w-36 rounded-full bg-[var(--primary-blue)]" />
          <p className="mt-4 max-w-2xl text-white/80">
            Steel industry news, company updates and product guides
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <article className="relative mb-12 overflow-hidden rounded-3xl text-white">
          <Image
            src="/macchine_warehouse1.png"
            alt="Featured industrial blog post"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative p-8 md:p-12">
            <p className="text-xs uppercase tracking-widest text-zinc-300">Featured Post</p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">{blogPosts[0]?.title}</h2>
            <p className="mt-3 max-w-2xl text-zinc-200">{blogPosts[0]?.excerpt}</p>
            <Link
              href={`/blog/${blogPosts[0]?.slug ?? ""}`}
              className="mt-6 inline-block rounded-full border border-white px-6 py-2 text-sm font-semibold"
            >
              Read More
            </Link>
          </div>
        </article>
        <BlogGrid posts={blogPosts} />
      </section>
    </div>
  );
}
