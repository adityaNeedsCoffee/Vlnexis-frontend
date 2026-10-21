import ServiceDetail from "./ServiceDetail";



export default async function ServiceSlugPage({ params }) {
  
  const { slug } = await params;

  return <ServiceDetail slug={slug} />;
}