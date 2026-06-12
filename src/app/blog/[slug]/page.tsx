import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/api";
import CtaBand from "@/components/CtaBand";

type Params = { slug: string };

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found — K6 Interiors" };
  return {
    title: `${post.title} — K6 Interiors`,
    description: post.excerpt || undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <article className="mx-auto max-w-3xl px-5 py-16">
        <Link
          href="/blog"
          className="text-sm font-semibold text-brand hover:underline"
        >
          ← Back to blog
        </Link>

        <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-accent-600">
          {formatDate(post.created_at)}
          {post.author ? ` · ${post.author}` : ""}
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-brand sm:text-4xl">
          {post.title}
        </h1>

        {post.cover_image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.cover_image}
            alt={post.title}
            className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover"
          />
        )}

        {/* Content is plain text from the admin; preserve line breaks. */}
        <div className="mt-8 space-y-4 whitespace-pre-line text-ink/90 leading-relaxed">
          {post.content}
        </div>
      </article>

      <CtaBand />
    </>
  );
}
