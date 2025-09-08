import { NewsHeader } from "@/components/NewsHeader";
import { NewsSection } from "@/components/NewsSection";
import { getArticlesByBias } from "@/data/mockNews";

const Index = () => {
  const leftArticles = getArticlesByBias("left");
  const centerArticles = getArticlesByBias("center");
  const rightArticles = getArticlesByBias("right");

  return (
    <div className="min-h-screen bg-[var(--news-gradient-subtle)]">
      <NewsHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <NewsSection 
            title="Left Perspective"
            articles={leftArticles}
            bias="left"
          />
          <NewsSection 
            title="Center Perspective" 
            articles={centerArticles}
            bias="center"
          />
          <NewsSection 
            title="Right Perspective"
            articles={rightArticles}
            bias="right"
          />
        </div>
      </main>
      
      <footer className="bg-card border-t mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Spectrum News aggregates articles from various sources to provide balanced political perspectives.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Always verify information from multiple sources and think critically about the news you consume.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
