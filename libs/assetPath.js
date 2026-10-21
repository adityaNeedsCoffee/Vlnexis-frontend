// libs/assetPath.js
const BASE =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.NODE_ENV === "production" ? "/Vlnexis-frontend" : "");

export const assetPath = (p = "") =>
  !p || p.startsWith("http") ? p : `${BASE}${p}`;