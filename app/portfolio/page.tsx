import PortfolioPage from "@/components/Portfoliopage";
import { getProjects } from "@/lib/Projects";

export const metadata = { title: "Portfolio" };

export default async function Page() {
  const projects = await getProjects();
  return <PortfolioPage projects={projects} />;
}