// Website-side data layer for the Portfolio.
// Keep these slugs identical to ProjectController::CATEGORIES (Laravel)
// and PROJECT_CATEGORIES in the dashboard's lib/resources.ts.

const API_URL = process.env.API_URL ?? "http://localhost:8000/api";

export type ProjectResult = { value: string; label: string };

export type ProjectItem = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  categories: string[]; // first one is the "main" category
  tags: string[] | null;
  year: number;
  client: string | null;
  duration: string | null;
  overview: string | null;
  objectives: string[] | null;
  challenge: string | null;
  solution: string | null;
  results: ProjectResult[] | null;
  cover_url: string | null;
  gallery_urls: string[] | null;
  sort_order: number;
  is_active: boolean;
};

export const PROJECT_CATEGORIES = [
  { slug: "research", label: "Research", filterLabel: "Research", color: "#17a398" },
  { slug: "software", label: "Software Development", filterLabel: "Software", color: "#2f6bff" },
  { slug: "web", label: "Web Development", filterLabel: "Web Development", color: "#7c4dff" },
  { slug: "mobile", label: "Mobile App", filterLabel: "Mobile Apps", color: "#2f6bff" },
  { slug: "branding", label: "Branding", filterLabel: "Branding", color: "#ff8a3d" },
  { slug: "aiml", label: "AI & ML", filterLabel: "AI & ML", color: "#e0457b" },
  { slug: "graphic", label: "Graphic Design", filterLabel: "Graphic Design", color: "#f5a623" },
] as const;

export const categoryLabel = (slug?: string) =>
  PROJECT_CATEGORIES.find((c) => c.slug === slug)?.label ?? "Project";

export const categoryColor = (slug?: string) =>
  PROJECT_CATEGORIES.find((c) => c.slug === slug)?.color ?? "#2f6bff";

// Returns null if Laravel can't be reached or the project doesn't exist.
export async function getProjects(): Promise<ProjectItem[] | null> {
  try {
    const res = await fetch(`${API_URL}/projects`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return (await res.json()) as ProjectItem[];
  } catch {
    return null;
  }
}

export async function getProject(slug: string): Promise<ProjectItem | null> {
  try {
    const res = await fetch(`${API_URL}/projects/${encodeURIComponent(slug)}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return (await res.json()) as ProjectItem;
  } catch {
    return null;
  }
}