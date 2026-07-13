// Static content + form-email client for the BACKEND-LESS build.
//
// The site is deployed as a static export (AWS S3 + CloudFront) with NO Django
// backend running. So:
//   • Page content below is hardcoded (no network fetches at build or runtime).
//   • Contact / consultation / service-booking forms are emailed via Web3Forms
//     (https://web3forms.com) — a form-to-email relay that needs no server of ours.
//
// To RECEIVE the form emails: create a free access key at https://web3forms.com
// (enter the inbox email, copy the access key), then set
//     NEXT_PUBLIC_WEB3FORMS_KEY=your-access-key
// in .env.local AND in the build environment BEFORE running `npm run build`
// (NEXT_PUBLIC_* is inlined into the static bundle at build time).
//
// The Django backend code still lives in the K6_backend repo — when the business
// grows, re-enable it and swap these getters back to real `fetch` calls.

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

// ---------------------------------------------------------------------------
// Types (unchanged from the API version, so components keep working)
// ---------------------------------------------------------------------------

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

export type HeroImage = {
  id: number;
  image: string;
  caption: string;
  order: number;
};

export type ServiceType = {
  id: number;
  name: string;
  description: string;
};

export type MaintenanceType = {
  id: number;
  name: string;
  description: string;
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

// ---------------------------------------------------------------------------
// Static content
// ---------------------------------------------------------------------------

// Portfolio gallery — uses the bundled realistic interior photos in /public so
// the gallery shows real rooms (not gradient placeholders) with no backend.
const PROJECTS: Project[] = [
  { id: 1, title: "Open-plan Living & Kitchen", description: "", image: "/hero-1.jpg", category: "living_room", category_display: "Living Room", city: "Chennai", is_featured: true, created_at: "2026-01-10" },
  { id: 2, title: "Handleless Modular Kitchen", description: "", image: "/hero-3.jpg", category: "kitchen", category_display: "Modular Kitchen", city: "Bengaluru", is_featured: false, created_at: "2026-01-09" },
  { id: 3, title: "Walk-in Wardrobe", description: "", image: "/hero-5.jpg", category: "wardrobe", category_display: "Wardrobe", city: "Hyderabad", is_featured: false, created_at: "2026-01-08" },
  { id: 4, title: "Modern Master Bedroom", description: "", image: "/hero-4.jpg", category: "bedroom", category_display: "Bedroom", city: "Coimbatore", is_featured: false, created_at: "2026-01-07" },
  { id: 5, title: "Contemporary Living Room", description: "", image: "/hero-8.jpg", category: "living_room", category_display: "Living Room", city: "Chennai", is_featured: false, created_at: "2026-01-06" },
  { id: 6, title: "Island Modular Kitchen", description: "", image: "/hero-9.jpg", category: "kitchen", category_display: "Modular Kitchen", city: "Bengaluru", is_featured: false, created_at: "2026-01-05" },
  { id: 7, title: "Warm Bedroom Retreat", description: "", image: "/hero-10.jpg", category: "bedroom", category_display: "Bedroom", city: "Madurai", is_featured: false, created_at: "2026-01-04" },
  { id: 8, title: "Bright Living Room", description: "", image: "/hero-2.jpg", category: "living_room", category_display: "Living Room", city: "Hyderabad", is_featured: false, created_at: "2026-01-03" },
];

// Service-booking dropdowns (previously admin-managed). Hardcoded so the
// booking form works without a backend.
const SERVICE_TYPES: ServiceType[] = [
  { id: 1, name: "Modular Kitchen", description: "" },
  { id: 2, name: "Wardrobe", description: "" },
  { id: 3, name: "Living Room", description: "" },
  { id: 4, name: "Bedroom", description: "" },
  { id: 5, name: "Full Home Interior", description: "" },
];

const MAINTENANCE_TYPES: MaintenanceType[] = [
  { id: 1, name: "Repair / Servicing", description: "" },
  { id: 2, name: "Deep Cleaning", description: "" },
  { id: 3, name: "Hardware Replacement", description: "" },
  { id: 4, name: "Polishing / Re-finishing", description: "" },
  { id: 5, name: "General Inspection", description: "" },
];

// ---------------------------------------------------------------------------
// Content getters — kept async so the existing (server-component) call sites
// don't change. They return static data; empty arrays let the components fall
// back to their own bundled defaults (hero photos, services, testimonials).
// ---------------------------------------------------------------------------

export async function getServices(): Promise<Service[]> {
  return []; // Services component renders its bundled FALLBACK list.
}

export async function getHeroImages(): Promise<HeroImage[]> {
  return []; // HeroCarousel falls back to /public/hero-1..10.jpg.
}

export async function getServiceTypes(): Promise<ServiceType[]> {
  return SERVICE_TYPES;
}

export async function getMaintenanceTypes(): Promise<MaintenanceType[]> {
  return MAINTENANCE_TYPES;
}

export async function getProjects(category?: string): Promise<Project[]> {
  if (!category || category === "all") return PROJECTS;
  return PROJECTS.filter((p) => p.category === category);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return []; // Testimonials component renders its bundled FALLBACK list.
}

export async function getPosts(): Promise<PostListItem[]> {
  return []; // Blog shows "coming soon" placeholders until we add a backend.
}

export async function getPost(_slug?: string): Promise<Post | null> {
  return null;
}

// ---------------------------------------------------------------------------
// Form submissions → Web3Forms (client-side, no backend)
// ---------------------------------------------------------------------------

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

async function sendWeb3Form(
  subject: string,
  fields: Record<string, string>
): Promise<SubmitResult> {
  if (!WEB3FORMS_KEY) {
    // Misconfiguration guard: no access key baked into the build.
    return {
      ok: false,
      errors: "The form isn't set up yet. Please call us or try again later.",
    };
  }
  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject,
        from_name: "K6 Interiors Website",
        ...fields,
      }),
    });
    const data = (await res.json().catch(() => ({}))) as {
      success?: boolean;
      message?: string;
    };
    if (res.ok && data.success) return { ok: true };
    return { ok: false, errors: data.message || "Could not send. Please try again." };
  } catch {
    return {
      ok: false,
      errors: "Could not reach the server. Please check your connection and try again.",
    };
  }
}

function leadFields(p: LeadPayload): Record<string, string> {
  return {
    Name: p.name,
    Phone: p.phone,
    Email: p.email || "",
    City: p.city || "",
    Budget: p.budget || "",
    "Service interested in": p.service_type || "",
    "Preferred date": p.preferred_date || "",
    Message: p.message || "",
  };
}

export const submitContact = (p: LeadPayload) =>
  sendWeb3Form("New enquiry — K6 Interiors", leadFields(p));

export const submitConsultation = (p: LeadPayload) =>
  sendWeb3Form("New consultation request — K6 Interiors", leadFields(p));

// --- Service / maintenance booking ----------------------------------------

export type ServiceBookingPayload = {
  name: string;
  phone: string;
  email: string;
  city?: string;
  address?: string;
  service_type: number;
  maintenance_type: number;
  preferred_date: string;
  time_slot: string;
  message?: string;
};

export async function submitServiceBooking(
  p: ServiceBookingPayload
): Promise<SubmitResult> {
  const service =
    SERVICE_TYPES.find((s) => s.id === p.service_type)?.name ??
    String(p.service_type);
  const maintenance =
    MAINTENANCE_TYPES.find((m) => m.id === p.maintenance_type)?.name ??
    String(p.maintenance_type);

  return sendWeb3Form("New service booking — K6 Interiors", {
    Name: p.name,
    Phone: p.phone,
    Email: p.email,
    City: p.city || "",
    Address: p.address || "",
    "Service type": service,
    "Maintenance type": maintenance,
    "Preferred date": p.preferred_date,
    "Time slot": p.time_slot,
    Message: p.message || "",
  });
}
