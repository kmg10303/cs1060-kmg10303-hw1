import { useEffect, useState } from "react";
import type { NewsArticle } from "@/types/news";
import { mappedDomains, inferBiasByDomain } from "@/lib/biasMap";

const API = "https://newsapi.org/v2/everything";

// small util
const chunk = <T,>(arr: T[], n: number) =>
  Array.from({ length: Math.ceil(arr.length / n) }, (_, i) => arr.slice(i * n, (i + 1) * n));

type Params = {
  pageSize?: number;      // per request (max 100)
  pagesPerChunk?: number; // how many pages per chunk to pull
  maxChunks?: number;     // limit chunks to avoid huge requests
  sortBy?: "publishedAt" | "relevancy" | "popularity";
  language?: "en";
};

export function useNews(params: Params = {}) {
  const {
    pageSize = 100,
    pagesPerChunk = 2,   // pull 2 pages per chunk => older items too
    maxChunks = 3,       // limit chunks (domains) for rate-safety
    sortBy = "publishedAt",
    language = "en",
  } = params;

  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setIsError(false);
      try {
        const domainsAll = mappedDomains();
        const domainChunks = chunk(domainsAll, 15).slice(0, maxChunks); // 15 domains per request
        const headers = { "X-Api-Key": import.meta.env.VITE_NEWSAPI_KEY as string };

        const requests: Promise<Response>[] = [];
        for (const doms of domainChunks) {
          const domStr = doms.join(",");
          for (let page = 1; page <= pagesPerChunk; page++) {
            const u = new URL(API);
            u.searchParams.set("domains", domStr);
            u.searchParams.set("language", language);
            u.searchParams.set("pageSize", String(pageSize));
            u.searchParams.set("page", String(page));
            u.searchParams.set("sortBy", sortBy);
            requests.push(fetch(u.toString(), { headers }));
          }
        }

        const resps = await Promise.all(requests);
        const jsons = await Promise.all(resps.map(r => r.ok ? r.json() : Promise.resolve({ articles: [] })));

        const all = jsons.flatMap((j: any) => j.articles ?? []);
        // dedupe by URL
        const byUrl = new Map<string, any>();
        for (const a of all) {
          if (!a?.url || !a?.title) continue;
          byUrl.set(a.url, a);
        }

        const mapped: NewsArticle[] = Array.from(byUrl.values())
          .map((a: any) => {
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
          })
          .filter(Boolean) as NewsArticle[];

        // optional: sort newest first
        mapped.sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""));

        setArticles(mapped);
      } catch {
        setIsError(true);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [pageSize, pagesPerChunk, maxChunks, sortBy, language]);

  return { articles, loading, isError };
}
