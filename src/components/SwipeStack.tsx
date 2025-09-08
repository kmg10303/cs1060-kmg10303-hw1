import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { SwipeCard } from "./SwipeCard";
import type { NewsArticle } from "@/types/news";
import { Button } from "@/components/ui/button";
import { RotateCcw, ExternalLink } from "lucide-react";

interface SwipeStackProps {
  articles: NewsArticle[];
  onVote: (article: NewsArticle, approved: boolean) => void;
  onReset: () => void;
}

export const SwipeStack = ({ articles, onVote, onReset }: SwipeStackProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  const handleSwipe = (direction: "left" | "right", article: NewsArticle) => {
    const approved = direction === "right";
    onVote(article, approved);
    setCurrentIndex(prev => prev + 1);
  };

  const handleTap = (article: NewsArticle) => {
    window.open(article.url, '_blank', 'noopener,noreferrer');
  };

  const handleReset = () => {
    setCurrentIndex(0);
    onReset();
  };

  // Show cards that haven't been swiped yet
  const remainingArticles = articles.slice(currentIndex, currentIndex + visibleCards);
  const hasMoreCards = currentIndex < articles.length;

  if (!hasMoreCards) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-6 text-center">
        <div className="text-6xl">🎉</div>
        <div>
          <h3 className="text-2xl font-bold mb-2">All Done!</h3>
          <p className="text-muted-foreground mb-6">
            You've reviewed all available articles. Check your political compass above!
          </p>
        </div>
        <Button onClick={handleReset} className="flex items-center gap-2">
          <RotateCcw className="h-4 w-4" />
          Start Over
        </Button>
      </div>
    );
  }

  return (
    <div className="relative h-96 w-full max-w-md mx-auto">
      <AnimatePresence mode="popLayout">
        {remainingArticles.slice(0, 1).map((article, index) => (
          <SwipeCard
            key={`${article.id}-${currentIndex}`}
            article={article}
            onSwipe={handleSwipe}
            onTap={handleTap}
            index={index}
          />
        ))}
      </AnimatePresence>

      {/* Progress indicator */}
      <div className="absolute -bottom-8 left-0 right-0 text-center">
        <p className="text-sm text-muted-foreground">
          {currentIndex + 1} / {articles.length}
        </p>
        <div className="w-full bg-muted rounded-full h-2 mt-2">
          <div 
            className="bg-primary rounded-full h-2 transition-all duration-300"
            style={{ width: `${((currentIndex) / articles.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};