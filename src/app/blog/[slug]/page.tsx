import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/api";
import PhotoPlate from "@/components/PhotoPlate";
import MeasureLine from "@/components/MeasureLine";
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
      <article className="mx-auto max-w-3xl px-5 pb-16 pt-12">
        <Link
          href="/blog"
          className="label-caps text-ink/50 transition-colors hover:text-brand"
        >
          ← Back to journal
        </Link>

        <p className="mt-8 label-caps">
          {formatDate(post.created_at)}
          {post.author ? ` · ${post.author}` : ""}
        </p>
        <MeasureLine className="mt-3 w-14" />
        <h1 className="mt-5 font-display text-display-2 font-normal leading-[1.05] tracking-tight text-brand">
          {post.title}
        </h1>

        {post.cover_image && (
          <div className="mt-10">
            <PhotoPlate
              src={post.cover_image}
              alt={post.title}
              ratio="16 / 9"
              parallax={false}
              priority
            />
          </div>
        )}

        {/* Content is plain text from the admin; preserve line breaks. */}
        <div className="dropcap mt-10 whitespace-pre-line text-lg leading-relaxed text-ink/85">
          {post.content}
        </div>

        <MeasureLine className="mt-14 w-full" />
      </article>

      <CtaBand />
    </>
  );
}
