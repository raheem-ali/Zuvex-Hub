import PublicationsPage from "../../components/Publicationspage";
import { getPublications } from "../../lib/content";

export default async function Page() {
  const publications = await getPublications();
  return <PublicationsPage publications={publications} />;
}