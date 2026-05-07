export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://sast-website.vercel.app/sitemap.xml",
  };
}

