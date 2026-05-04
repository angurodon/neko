import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://www.ic-gr.net";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${BASE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/overview/`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/company/`, lastModified, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE_URL}/privacy/`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
