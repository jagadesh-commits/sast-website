"use client";

import { BlogCategory, BlogPost } from "@/lib/blog-data";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";

const filters = ["All", "Industry News", "Company Update", "Product Guide"] as const;

export function BlogGrid({ posts }: { posts: BlogPost[] }) {
  const [active, setActive] = useState<(typeof filters)[number]>("All");

  const filtered = useMemo(
    () => posts.filter((post) => active === "All" || post.category === (active as BlogCategory)),
    [active, posts]
  );

  return (
    <>
      <div className="mt-10 flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActive(filter)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              active === filter
                ? "bg-[var(--primary-blue)] text-white shadow-lg shadow-[var(--primary-blue)]/30"
                : "border border-zinc-300 bg-white text-zinc-700"
            }`}
          >
            {filter === "Company Update" ? "Company Updates" : filter === "Product Guide" ? "Product Guides" : filter}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-10 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((post) => (
          <motion.article
            layout
            key={post.slug}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="premium-card rounded-3xl border border-zinc-200 p-5 transition duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(26,58,143,0.16)]"
          >
            <div className="relative h-44 overflow-hidden rounded-2xl">
              <Image src="/machine2.png" alt="" fill sizes="(max-width:768px)100vw,33vw" className="object-cover" />
            </div>
            <span className="mt-4 inline-flex rounded-full bg-[var(--primary-blue)]/10 px-3 py-1 text-xs font-bold text-[var(--primary-blue)]">
              {post.category}
            </span>
            <h3 className="mt-3 text-2xl font-bold text-[var(--primary-blue)]">{post.title}</h3>
            <p className="mt-3 text-sm text-zinc-600">{post.excerpt}</p>
            <p className="mt-4 text-xs text-zinc-500">
              {post.author} | {post.date}
            </p>
            <Link href={`/blog/${post.slug}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary-blue)]">
              Read More <span aria-hidden>→</span>
            </Link>
          </motion.article>
        ))}
      </motion.div>
    </>
  );
}
