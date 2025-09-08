export type Bias = "left" | "center" | "right";

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  source: string;
  bias: Bias;
  url: string;
  publishedAt: string;   // ISO
  imageUrl?: string;
}
