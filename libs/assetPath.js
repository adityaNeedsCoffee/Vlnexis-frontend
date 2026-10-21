export const assetPath = (p = "") =>
  !p || p.startsWith("http") ? p : `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${p}`;