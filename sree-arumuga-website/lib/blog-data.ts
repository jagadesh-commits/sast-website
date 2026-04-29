export type BlogCategory = "Industry News" | "Company Update" | "Product Guide";

export type BlogPost = {
  slug: string;
  title: string;
  category: BlogCategory;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  content: string[];
  quote: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "steel-price-trends-india-2024",
    title: "Steel Price Trends in India 2024",
    category: "Industry News",
    excerpt: "A market snapshot of pricing shifts, supply factors, and procurement implications for buyers.",
    author: "Market Desk",
    date: "March 12, 2024",
    readTime: "6 min read",
    quote: "Price awareness is now a strategic advantage for every steel buyer.",
    content: [
      "Steel pricing in India has remained dynamic due to freight costs, energy trends, and changing infrastructure demand.",
      "Large projects continue to influence local availability, especially for high-volume plate and coil categories.",
      "Businesses with planned procurement cycles and trusted supply partners have seen better cost predictability.",
    ],
  },
  {
    slug: "sree-arumuga-becomes-jsw-exclusive-dealer",
    title: "Sree Arumuga becomes JSW Exclusive Distributor",
    category: "Company Update",
    excerpt: "A major milestone in our journey to deliver certified quality steel with dependable availability.",
    author: "Company Team",
    date: "February 02, 2024",
    readTime: "4 min read",
    quote: "This recognition strengthens our promise of reliability and product confidence.",
    content: [
      "Our exclusive distributor recognition reflects long-term credibility, market trust, and customer-first operations.",
      "Clients now benefit from improved access to premium product lines with stronger continuity of supply.",
      "We remain focused on transparent service, responsive quoting, and dependable fulfillment.",
    ],
  },
  {
    slug: "how-to-choose-the-right-steel-grade",
    title: "How to Choose the Right Steel Grade",
    category: "Product Guide",
    excerpt: "A practical checklist for selecting suitable steel grades based on usage, strength, and environment.",
    author: "Technical Team",
    date: "January 20, 2024",
    readTime: "7 min read",
    quote: "Correct grade selection prevents rework, delays, and lifecycle failures.",
    content: [
      "Choosing the right grade begins with use-case clarity: structure, load, fabrication method, and exposure conditions.",
      "Standards, tolerances, and finish quality should be validated before finalizing your purchase order.",
      "Consulting experienced suppliers early can reduce risk and improve project performance.",
    ],
  },
  {
    slug: "tamil-nadu-infrastructure-boom-drives-steel-demand",
    title: "Tamil Nadu Infrastructure Boom Drives Steel Demand",
    category: "Industry News",
    excerpt: "Infrastructure growth across transport and industrial corridors is accelerating steel consumption.",
    author: "Market Desk",
    date: "December 15, 2023",
    readTime: "5 min read",
    quote: "Regional growth is translating directly into sustained steel demand.",
    content: [
      "Major public and private projects are increasing procurement volumes for structural and flat steel products.",
      "With tighter timelines, buyers are prioritizing suppliers with ready stock and coordinated logistics.",
      "Strategic sourcing partnerships are becoming central to project continuity.",
    ],
  },
  {
    slug: "our-journey-40-years-of-steel-excellence",
    title: "Our Journey: 40 Years of Steel Excellence",
    category: "Company Update",
    excerpt: "From market roots in Chennai to a trusted B2B steel name, built over four decades.",
    author: "Leadership Team",
    date: "November 08, 2023",
    readTime: "5 min read",
    quote: "Our progress is built on trust, consistency, and customer partnerships.",
    content: [
      "Since 1984, we have grown by combining deep market knowledge with service discipline.",
      "Our team has consistently delivered quality material support for projects of varied scale.",
      "The next chapter remains focused on stronger client outcomes and premium supply standards.",
    ],
  },
  {
    slug: "hr-vs-cr-steel-sheets-complete-guide",
    title: "HR vs CR Steel Sheets - Complete Guide",
    category: "Product Guide",
    excerpt: "Understand the practical differences between hot-rolled and cold-rolled sheets before procurement.",
    author: "Technical Team",
    date: "October 03, 2023",
    readTime: "8 min read",
    quote: "Material selection should align with both performance and process requirements.",
    content: [
      "Hot-rolled sheets are generally preferred for structural and less finish-sensitive applications.",
      "Cold-rolled sheets offer tighter tolerances and improved surface quality for precision requirements.",
      "Application goals, finishing needs, and budget should guide your final selection.",
    ],
  },
];
