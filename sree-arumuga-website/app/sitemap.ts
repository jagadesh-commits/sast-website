export default function sitemap() {
  return [
    { url: "https://sast-website.vercel.app/", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://sast-website.vercel.app/about", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://sast-website.vercel.app/products", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: "https://sast-website.vercel.app/achievements", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://sast-website.vercel.app/contact", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}

