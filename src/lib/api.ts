// Typed client for the Django REST backend.
// Server Components call these with `fetch` (no-store) so data is always fresh.

// Base URL of the Django backend. Set NEXT_PUBLIC_API_URL to the public API
// URL (e.g. a tunnel) when sharing the site; defaults to local dev otherwise.
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

function apiBase(): string {
  return API_BASE;
}

export type Service = {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string | null;
  starting_price: number | null;
  order: number;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  category_display: string;
  city: string;
  is_featured: boolean;
  created_at: string;
};

export type Testimonial = {
  id: number;
  customer_name: string;
  city: string;
  review: string;
  rating: number;
  created_at: string;
};

export type PostListItem = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string | null;
  author: string;
  created_at: string;
};

export type Post = PostListItem & {
  content: string;
  updated_at: string;
};

type Paginated<T> = { count: number; results: T[] };

async function getJSON<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${apiBase()}/api/k6${path}`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    // Backend not running / network error — let the UI fall back gracefully.
    return null;
  }
}

export async function getServices(): Promise<Service[]> {
  return (await getJSON<Service[]>("/services/")) ?? [];
}

export async function getProjects(category?: string): Promise<Project[]> {
  const qs = category && category !== "all" ? `?category=${category}` : "";
  const data = await getJSON<Paginated<Project>>(`/projects/${qs}`);
  return data?.results ?? [];
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const data = await getJSON<Paginated<Testimonial>>("/testimonials/");
  return data?.results ?? [];
}

export async function getPosts(): Promise<PostListItem[]> {
  const data = await getJSON<Paginated<PostListItem>>("/blog/");
  return data?.results ?? [];
}

export async function getPost(slug: string): Promise<Post | null> {
  return getJSON<Post>(`/blog/${slug}/`);
}

// --- Form submissions (client-side) ---------------------------------------

export type LeadPayload = {
  name: string;
  phone: string;
  email?: string;
  city?: string;
  budget?: string;
  service_type?: string;
  message?: string;
  preferred_date?: string;
};

export type SubmitResult =
  | { ok: true }
  | { ok: false; errors: Record<string, string[]> | string };

async function postLead(path: string, payload: LeadPayload): Promise<SubmitResult> {
  try {
    const res = await fetch(`${apiBase()}/api/k6${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) return { ok: true };
    const data = await res.json().catch(() => ({}));
    return { ok: false, errors: data ?? "Something went wrong." };
  } catch {
    return { ok: false, errors: "Could not reach the server. Is the backend running?" };
  }
}

export const submitContact = (p: LeadPayload) => postLead("/contact/", p);
export const submitConsultation = (p: LeadPayload) => postLead("/consultation/", p);
