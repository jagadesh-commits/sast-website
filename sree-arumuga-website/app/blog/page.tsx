import type { Metadata } from "next";
import { BlogGrid } from "@/components/blog-grid";
import { blogPosts } from "@/lib/blog-data";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Steel Blog | HR Coil Price, CR Coil, GP Coil Guide | Sree Arumuga Chennai",
  description:
    "Steel industry guides, HR coil price updates, CR vs HR coil comparison, GP coil full form explained. Expert steel knowledge from JSW distributor Chennai.",
  keywords:
    "hr coil price today, cr coil full form, what is hrpo, gp coil full form, hr coil vs cr coil, steel price chennai, jsw steel price today",
};

export default function BlogPage() {
  const featuredPost = blogPosts[0];

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
        <article className="relative mb-12 overflow-hidden rounded-3xl bg-[#1d1f24] text-white">
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-[1024/682] w-full md:min-h-full">
              <Image
                src={featuredPost.image}
                alt={featuredPost.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8 md:p-12">
              <p className="text-xs uppercase tracking-widest text-zinc-300">Featured Post</p>
              <h2 className="mt-3 text-2xl font-black sm:text-3xl md:text-4xl">{featuredPost.title}</h2>
              <p className="mt-3 max-w-2xl text-sm text-zinc-200 sm:text-base">{featuredPost.excerpt}</p>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="mt-6 inline-block self-start rounded-full border border-white px-6 py-2 text-sm font-semibold"
              >
                Read More
              </Link>
            </div>
          </div>
        </article>
        <BlogGrid posts={blogPosts} />
      </section>
    </div>
  );
}
