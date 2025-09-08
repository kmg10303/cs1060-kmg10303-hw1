import { useState } from "react";
import { NewsHeader } from "@/components/NewsHeader";
import { PoliticalCompass } from "@/components/PoliticalCompass";
import { SwipeStack } from "@/components/SwipeStack";
import { mockNewsData } from "@/data/mockNews";
import { NewsArticle } from "@/components/NewsCard";

const Index = () => {
  const [votes, setVotes] = useState<{ article: NewsArticle; approved: boolean }[]>([]);

  // Calculate political compass scores based on user votes
  const calculateScores = () => {
    let leftScore = 0;
    let centerScore = 0;
    let rightScore = 0;

    votes.forEach(vote => {
      if (vote.approved) {
        // User approved this article, so they align with its bias
        switch (vote.article.bias) {
          case "left":
            leftScore += 1;
            break;
          case "center":
            centerScore += 1;
            break;
          case "right":
            rightScore += 1;
            break;
        }
      } else {
        // User rejected this article, so they oppose its bias
        // Add points to opposing sides
        switch (vote.article.bias) {
          case "left":
            centerScore += 0.5;
            rightScore += 0.5;
            break;
          case "center":
            // Rejecting center content slightly pushes toward extremes
            leftScore += 0.3;
            rightScore += 0.3;
            break;
          case "right":
            leftScore += 0.5;
            centerScore += 0.5;
            break;
        }
      }
    });

    return { leftScore, centerScore, rightScore };
  };

  const handleVote = (article: NewsArticle, approved: boolean) => {
    setVotes(prev => [...prev, { article, approved }]);
  };

  const handleReset = () => {
    setVotes([]);
  };

  const { leftScore, centerScore, rightScore } = calculateScores();

  return (
    <div className="min-h-screen bg-[var(--news-gradient-subtle)]">
      <NewsHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Political Compass */}
        <PoliticalCompass 
          leftScore={Math.round(leftScore)}
          centerScore={Math.round(centerScore)}
          rightScore={Math.round(rightScore)}
          totalVotes={votes.length}
        />

        {/* Instructions */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Discover Your Political Compass</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Swipe right (→) to approve articles you agree with, or swipe left (←) to reject them. 
            Tap to read the full article.
          </p>
        </div>

        {/* Swipe Stack */}
        <div className="flex justify-center pb-16">
          <SwipeStack 
            articles={mockNewsData}
            onVote={handleVote}
            onReset={handleReset}
          />
        </div>
      </main>
      
      <footer className="bg-card border-t py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            Your compass reflects your reaction to different news perspectives • Results are for entertainment only
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
