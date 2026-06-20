export type BlogCategory = "Industry News" | "Company Update" | "Product Guide";

export type BlogPost = {
  slug: string;
  title: string;
  category: BlogCategory;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
  content: string[];
  quote: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "steel-price-trends-india-2024",
    title: "Steel Price Trends in India 2026",
    category: "Industry News",
    excerpt:
      "HR and CR coil prices rose through early 2026 on safeguard duty changes and strong infrastructure demand. Here's what buyers need to know.",
    author: "Market Desk",
    date: "May 15, 2026",
    readTime: "6 min read",
    image: "/blog/steel-price-trends-2026.png",
    imageAlt: "Steel market price trends analysis India 2026 with analyst reviewing charts and warehouse coils",
    quote: "Price awareness is now a strategic advantage for every steel buyer.",
    content: [
      "Steel prices in India have firmed up through the first half of 2026. HR coil is currently trading between ₹54,800 and ₹60,450 per metric tonne, while CR coil remains in the ₹58-66 per kg range, depending on grade and city.",
      "Domestic mills raised HRC and CRC prices in January 2026, pushing rates to roughly ₹51,700 per tonne after the hike, driven largely by rising raw material costs and a newly imposed three-year safeguard duty on selected steel imports (starting at 12%, stepping down to 11.5% and then 11% over the period). This duty has reduced import pressure and given domestic producers more pricing leverage.",
      "On the demand side, India's HR coil price trend advanced nearly 6% in Q1 2026 alone, fuelled by strong infrastructure project activity, a recovering real estate sector, and healthy festive-season auto sector orders.",
      "For buyers and fabricators, this means: budget for continued price firmness through mid-2026, lock in bulk orders where possible to manage cost exposure, and stay in close contact with your distributor for week-to-week pricing, since rates can shift based on mill announcements. As always, contact Sree Arumuga Steel Trading for the latest confirmed pricing before placing large orders — prices in this post are indicative market snapshots, not live quotes.",
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
    image: "/blog/jsw-exclusive-distributor.png",
    imageAlt: "Sree Arumuga Steel Trading becomes JSW Exclusive Distributor partnership announcement",
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
    date: "April 10, 2026",
    readTime: "7 min read",
    image: "/blog/choosing-steel-grade.png",
    imageAlt: "Guide to choosing the right steel grade with HR, CR, GI and SS sheet samples",
    quote: "Correct grade selection prevents rework, delays, and lifecycle failures.",
    content: [
      "Choosing the right steel grade remains one of the most common questions we get from fabricators and contractors in 2026. Here's an updated practical checklist based on current JSW product specifications.",
      "Choosing the right grade begins with use-case clarity: structure, load, fabrication method, and exposure conditions.",
      "Standards, tolerances, and finish quality should be validated before finalizing your purchase order.",
      "Consulting experienced suppliers early can reduce risk and improve project performance.",
    ],
  },
  {
    slug: "tamil-nadu-infrastructure-boom-drives-steel-demand",
    title: "Tamil Nadu Infrastructure Growth Continues to Drive Steel Demand in 2026",
    category: "Industry News",
    excerpt:
      "Ongoing infrastructure and industrial corridor projects across Tamil Nadu continue to push steel demand higher in 2026.",
    author: "Market Desk",
    date: "March 20, 2026",
    readTime: "5 min read",
    image: "/blog/tamil-nadu-infrastructure-2026.png",
    imageAlt: "Tamil Nadu infrastructure construction site with steel building frame driving steel demand in 2026",
    quote: "Regional growth is translating directly into sustained steel demand.",
    content: [
      "Tamil Nadu's infrastructure momentum has carried strongly into 2026. Transport corridor expansions, industrial park development, and continued real estate recovery are keeping steel demand elevated across the state.",
      "This sustained demand aligns with the broader national trend — India's HR coil pricing rose nearly 6% in Q1 2026 alone, driven in large part by infrastructure and construction-linked consumption. For fabricators and contractors in and around Chennai, this means steady project pipelines but also tighter supply windows during peak construction periods.",
      "Sree Arumuga Steel Trading continues to stock HR, CR, GP, GL, EG, PPGL sheets, coils and MS plates to support this demand, with reliable dispatch for ongoing infrastructure and industrial projects across Tamil Nadu.",
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
    image: "/blog/40-years-steel-excellence.png",
    imageAlt: "Sree Arumuga Steel Trading 40 years of steel excellence anniversary celebration",
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
    date: "April 25, 2026",
    readTime: "8 min read",
    image: "/blog/hr-vs-cr-sheets-guide.png",
    imageAlt: "Hot rolled versus cold rolled steel sheets comparison guide showing surface finish differences",
    quote: "Material selection should align with both performance and process requirements.",
    content: [
      "Understanding the difference between hot-rolled and cold-rolled steel sheets is essential for procurement decisions in 2026's competitive steel market. Here's a complete, updated comparison.",
      "Hot-rolled sheets are generally preferred for structural and less finish-sensitive applications.",
      "Cold-rolled sheets offer tighter tolerances and improved surface quality for precision requirements.",
      "Application goals, finishing needs, and budget should guide your final selection.",
    ],
  },
];
