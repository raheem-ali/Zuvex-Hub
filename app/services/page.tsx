import ServicesPage from "../../components/ServicesPage";
import { getServices } from "../../lib/content";

export default async function Page() {
  const services = await getServices();
  return <ServicesPage services={services} />;
}