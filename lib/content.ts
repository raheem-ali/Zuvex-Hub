import type { ServiceItem, TeamItem } from "../components/Homepage";
import type { PublicationItem } from "../components/Publicationspage";

const API_URL = process.env.API_URL ?? "http://localhost:8000/api";

// Returns null if Laravel can't be reached, so the page can fall back to defaults.
async function getList<T>(path: string): Promise<T[] | null> {
  try {
    const res = await fetch(`${API_URL}/${path}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 }, // also refreshed instantly when the dashboard saves
    });
    if (!res.ok) return null;
    return (await res.json()) as T[];
  } catch {
    return null;
  }
}

export const getServices = () => getList<ServiceItem>("services");
export const getTeam = () => getList<TeamItem>("team");
export const getPublications = () => getList<PublicationItem>("publications");