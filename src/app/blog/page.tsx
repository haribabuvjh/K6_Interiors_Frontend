import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/api";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Blog — Nestora Interiors",
  description:
    "Interior design tips, budgeting guides and ideas for kitchens, wardrobes and living spaces.",
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Shown when the backend has no posts yet, so the page never looks empty.
const PLACEHOLDERS = [
  {
    title: "5 Ideas for a Small Modular Kitchen",
    excerpt:
      "Make the most of a compact kitchen with smart storage, light colours and clever layouts.",
  },
  {
    title: "How to Budget Your Home Interiors",
    excerpt:
      "A simple, room-by-room guide to planning your interior budget without surprises.",
  },
  {
    title: "Wardrobe Styles That Save Space",
    excerpt:
      "Sliding, hinged or walk-in? Pick the right wardrobe for your room and lifestyle.",
  },
];

export default async function BlogPage() {
  const posts = await getPosts();
  const hasReal = posts.length > 0;

  return (
    <>
      <section className="bg-brand">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h1 className="font-display text-4xl font-semibold text-cream sm:text-5xl">
            Blog
          </h1>
          <p className="mt-3 max-w-xl text-cream/80">
            Tips, guides and ideas to help you design a home you love.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hasReal
            ? posts.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  {p.cover_image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.cover_image}
                      alt={p.title}
                      className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-48 w-full bg-gradient-to-br from-brand to-brand-700" />
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-accent-600">
                      {formatDate(p.created_at)}
                      {p.author ? ` · ${p.author}` : ""}
                    </p>
                    <h2 className="mt-2 font-display text-lg text-ink">
                      {p.title}
                    </h2>
                    {p.excerpt && (
                      <p className="mt-2 line-clamp-3 text-sm text-muted">
                        {p.excerpt}
                      </p>
                    )}
                    <span className="mt-4 text-sm font-semibold text-brand">
                      Read more →
                    </span>
                  </div>
                </Link>
              ))
            : PLACEHOLDERS.map((p, i) => (
                <article
                  key={i}
                  className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm"
                >
                  <div
                    className={`h-48 w-full bg-gradient-to-br ${
                      [
                        "from-brand to-brand-700",
                        "from-accent to-accent-600",
                        "from-brand-300 to-brand",
                      ][i % 3]
                    }`}
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="font-display text-lg text-ink">{p.title}</h2>
                    <p className="mt-2 text-sm text-muted">{p.excerpt}</p>
                  </div>
                </article>
              ))}
        </div>

        {!hasReal && (
          <p className="mt-8 text-center text-sm text-muted">
            Articles coming soon — add posts from the admin panel to show them here.
          </p>
        )}
      </section>

      <CtaBand />
    </>
  );
}
