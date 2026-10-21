import ServiceDetailClient from "./ServiceDetailClient";

export async function generateStaticParams() {
  const res = await fetch(`${process.env.BACKEND_URL}/services`);
  const json = await res.json();
  const list = json.data ?? json; // response ke shape ke hisaab se
  return list.map((s) => ({ slug: s.slug }));
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <ServiceDetailClient slug={slug} />;
}