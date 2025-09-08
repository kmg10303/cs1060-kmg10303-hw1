import { useEffect, useState } from "react";
import type { NewsArticle } from "@/types/news";
import { inferBiasByDomain } from "@/lib/biasMap";

export function useNews() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setIsError(false);
      try {
        // call your Netlify Function, not NewsAPI directly
        const r = await fetch("/.netlify/functions/news?pageSize=50&pagesPerChunk=2");
        if (!r.ok) throw new Error(String(r.status));
        const json = await r.json();

        const mapped: NewsArticle[] = (json.articles ?? []).map((a: any) => {
          let host = "";
          try { host = new URL(a.url).hostname; } catch {}
          const bias = host ? inferBiasByDomain(host) : null;
          if (!bias) return null;
          return {
            id: a.url,
            title: a.title,
            description: a.description ?? "",
            source: a?.source?.name ?? host,
            bias,
            url: a.url,
            publishedAt: a.publishedAt ?? new Date().toISOString(),
            imageUrl: a.urlToImage ?? undefined,
          } as NewsArticle;
        }).filter(Boolean) as NewsArticle[];

        setArticles(mapped);
      } catch {
        setIsError(true);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  return { articles, loading, isError };
}
