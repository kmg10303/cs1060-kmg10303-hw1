import { NewsCard, NewsArticle } from "./NewsCard";

interface NewsSectionProps {
  title: string;
  articles: NewsArticle[];
  bias: "left" | "center" | "right";
}

const getSectionStyle = (bias: "left" | "center" | "right") => {
  switch (bias) {
    case "left":
      return "border-l-4 border-left-lean bg-left-lean-subtle";
    case "center":
      return "border-l-4 border-center-lean bg-center-lean-subtle";
    case "right":
      return "border-l-4 border-right-lean bg-right-lean-subtle";
  }
};

export const NewsSection = ({ title, articles, bias }: NewsSectionProps) => {
  return (
    <section className={`p-6 rounded-lg ${getSectionStyle(bias)}`}>
      <h2 className="text-2xl font-bold mb-6 text-foreground">{title}</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {articles.map((article) => (
          <a 
            key={article.id} 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <NewsCard article={article} />
          </a>
        ))}
      </div>
    </section>
  );
};