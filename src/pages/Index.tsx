import { useMemo, useState } from "react";
import { NewsHeader } from "@/components/NewsHeader";
import { PoliticalCompass } from "@/components/PoliticalCompass";
import { SwipeStack } from "@/components/SwipeStack";
import type { NewsArticle } from "@/types/news";
import { useNews } from "@/hooks/useNews";

const Index = () => {
  const { articles, loading, isError } = useNews({ country: "us", pageSize: 30 });

  const [votes, setVotes] = useState<Record<string, boolean>>({});
  const handleVote = (article: NewsArticle, approved: boolean) =>
    setVotes(prev => ({ ...prev, [article.id]: approved }));
  const handleReset = () => setVotes({});

  const { leftScore, centerScore, rightScore, totalVotes } = useMemo(() => {
    let left = 0, center = 0, right = 0;
    Object.entries(votes).forEach(([id, approved]) => {
      const a = articles.find(x => x.id === id);
      if (!a) return;
      if (approved) {
        if (a.bias === "left") left += 1;
        else if (a.bias === "center") center += 1;
        else right += 1;
      } else {
        if (a.bias === "left") { center += 0.5; right += 0.5; }
        else if (a.bias === "center") { left += 0.3; right += 0.3; }
        else { left += 0.5; center += 0.5; }
      }
    });
    return {
      leftScore: Math.round(left),
      centerScore: Math.round(center),
      rightScore: Math.round(right),
      totalVotes: Object.keys(votes).length,
    };
  }, [votes, articles]);

  return (
    <div className="min-h-screen bg-[var(--news-gradient-subtle)]">
      <NewsHeader />
      <main className="container mx-auto px-4 py-8">
        <PoliticalCompass
          leftScore={leftScore}
          centerScore={centerScore}
          rightScore={rightScore}
          totalVotes={totalVotes}
        />

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Discover Your Political Compass</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Swipe → approve, ← reject. Tap to read.
          </p>
        </div>

        <div className="flex justify-center pb-16 min-h-[240px]">
          {loading && <div className="text-muted-foreground">Loading news…</div>}
          {isError && <div className="text-destructive">Failed to load news.</div>}
          {!loading && !isError && articles.length > 0 && (
            <SwipeStack articles={articles} onVote={handleVote} onReset={handleReset} />
          )}
          {!loading && !isError && articles.length === 0 && (
            <div className="text-muted-foreground">No articles available.</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
