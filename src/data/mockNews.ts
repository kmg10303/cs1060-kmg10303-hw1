import { NewsArticle } from "@/components/NewsCard";

export const mockNewsData: NewsArticle[] = [
  // Left-leaning articles
  {
    id: "1",
    title: "Climate Action Accelerates as Green Energy Investments Surge",
    description: "New federal initiatives are driving unprecedented investment in renewable energy infrastructure, creating jobs and reducing carbon emissions nationwide.",
    source: "Progressive Today",
    bias: "left",
    url: "#",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2", 
    title: "Universal Healthcare Shows Promise in Pilot Programs",
    description: "Early results from state-level universal healthcare pilots demonstrate improved patient outcomes and reduced administrative costs.",
    source: "Health Forward",
    bias: "left", 
    url: "#",
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
  
  // Center articles
  {
    id: "3",
    title: "Bipartisan Infrastructure Bill Shows Progress on Key Projects",
    description: "Both parties celebrate milestone achievements in transportation and broadband infrastructure development across rural and urban areas.",
    source: "National Review",
    bias: "center",
    url: "#", 
    publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    title: "Tech Innovation Drives Economic Growth Across Multiple Sectors",
    description: "Artificial intelligence and automation technologies are reshaping industries while creating new job categories and economic opportunities.",
    source: "Balanced Report",
    bias: "center",
    url: "#",
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
  
  // Right-leaning articles  
  {
    id: "5",
    title: "Small Business Optimism Rises on Deregulation Efforts",
    description: "Entrepreneurs report increased confidence as federal agencies reduce bureaucratic barriers and streamline approval processes for new ventures.",
    source: "Business Liberty",
    bias: "right",
    url: "#",
    publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "6",
    title: "Border Security Measures Show Effectiveness in Latest Data",
    description: "Enhanced border protection technologies and increased staffing levels contribute to improved security metrics according to federal reports.",
    source: "Security First",
    bias: "right", 
    url: "#",
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  }
];

export const getArticlesByBias = (bias: "left" | "center" | "right"): NewsArticle[] => {
  return mockNewsData.filter(article => article.bias === bias);
};