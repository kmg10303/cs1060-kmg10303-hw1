// hooks/useNews.ts
import { useEffect, useState } from "react";
import type { NewsArticle } from "@/types/news";
import { inferBias } from "@/lib/biasMap";
import { timeAgoFromISO } from "@/lib/time";

export function useNews() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=${import.meta.env.VITE_NEWSAPI_KEY}`
      );
      const json = await res.json();
      const mapped: NewsArticle[] = json.articles.map((a: any) => ({
        id: a.url,
        title: a.title,
        excerpt: a.description ?? "",
        source: a.source?.name ?? "Unknown",
        timeAgo: timeAgoFromISO(a.publishedAt),
        url: a.url,
        bias: inferBias(a.source?.name),
      }));
      setArticles(mapped);
      setLoading(false);
    };
    fetchNews();
  }, []);

  return { articles, loading };
}
