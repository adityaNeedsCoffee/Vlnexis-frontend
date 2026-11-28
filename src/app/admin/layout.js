import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export const dynamic = "force-dynamic"; // <- add


const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";





async function getUser() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  const res = await fetch(`${API_BASE_URL}/users/me`, {
    headers: { Cookie: `token=${token}` },
    cache: "no-store",
  });
  if (!res.ok) return null;

  const json = await res.json();
  return json.data;
}

export default async function AdminLayout({ children }) {
  const user = await getUser();

  if (!user) redirect("/login");
  if (user.role !== "admin") redirect("/");

  return <>{children}</>;
}