import { notFound } from "next/navigation";
import PortfolioDetailsPage from "@/components/Portfoliodetailspage";
import { getProject } from "@/lib/Projects";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const project = await getProject(slug);
  return { title: project ? project.title : "Project not found" };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();
  return <PortfolioDetailsPage project={project} />;
}