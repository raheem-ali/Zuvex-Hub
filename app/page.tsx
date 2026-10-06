import HomePage from "../components/Homepage";
import { getServices, getTeam } from "@/lib/content";

export default async function Page() {
  const [services, team] = await Promise.all([getServices(), getTeam()]);
  return <HomePage services={services} team={team} />;
}