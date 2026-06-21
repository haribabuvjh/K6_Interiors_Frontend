import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/api";
import PageHeader from "@/components/PageHeader";
import PhotoPlate from "@/components/PhotoPlate";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Blog — K6 Interiors",
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

const GRADIENTS = ["from-brand to-brand-700", "from-accent to-accent-600", "from-brand-300 to-brand"];

export default async function BlogPage() {
  const posts = await getPosts();
  const hasReal = posts.length > 0;

  return (
    <>
      <PageHeader
        kicker="Journal"
        title="Ideas for a home you"
        accentWord="love."
        standfirst="Tips, guides and inspiration for kitchens, wardrobes and living spaces."
        photo="/hero-6.jpg"
      />

      <section className="section-y mx-auto max-w-5xl px-5">
        {hasReal ? (
          <div>
            {posts.map((p, i) => {
              const flip = i % 2 === 1;
              return (
                <article key={p.id} className="border-t border-ink/12 py-12 first:border-t-0 first:pt-0">
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group grid items-center gap-8 lg:grid-cols-2"
                  >
                    <div className={flip ? "lg:order-2" : ""}>
                      {p.cover_image ? (
                        <PhotoPlate src={p.cover_image} alt={p.title} ratio="4 / 3" />
                      ) : (
                        <div className="bg-cream p-1.5 ring-1 ring-ink/10">
                          <div
                            className={`w-full rounded-plate bg-gradient-to-br ${GRADIENTS[i % 3]}`}
                            style={{ aspectRatio: "4 / 3" }}
                          />
                        </div>
                      )}
                    </div>
                    <div className={flip ? "lg:order-1" : ""}>
                      <p className="label-caps text-ink/50">
                        {formatDate(p.created_at)}
                        {p.author ? ` · ${p.author}` : ""}
                      </p>
                      <h2 className="mt-3 font-display text-2xl leading-snug text-brand sm:text-3xl">
                        {p.title}
                      </h2>
                      {p.excerpt && (
                        <p className="mt-3 line-clamp-3 text-ink/70">{p.excerpt}</p>
                      )}
                      <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-brand">
                        <span className="relative">
                          Read more
                          <span className="absolute -bottom-1 left-0 h-px w-full origin-left bg-accent transition-transform duration-300 group-hover:scale-x-50" />
                        </span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PLACEHOLDERS.map((p, i) => (
                <article key={i} className="flex flex-col">
                  <div className="bg-cream p-1.5 ring-1 ring-ink/10">
                    <div
                      className={`w-full rounded-plate bg-gradient-to-br ${GRADIENTS[i % 3]}`}
                      style={{ aspectRatio: "4 / 3" }}
                    />
                  </div>
                  <h2 className="mt-4 font-display text-lg text-brand">{p.title}</h2>
                  <p className="mt-2 text-sm text-muted">{p.excerpt}</p>
                </article>
              ))}
            </div>
            <p className="mt-10 text-center text-sm text-muted">
              Articles coming soon — add posts from the admin panel to show them here.
            </p>
          </>
        )}
      </section>

      <CtaBand />
    </>
  );
}
