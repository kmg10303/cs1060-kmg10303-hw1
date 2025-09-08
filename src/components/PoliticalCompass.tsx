import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface PoliticalCompassProps {
  leftScore: number;
  centerScore: number;
  rightScore: number;
  totalVotes: number;
}

export const PoliticalCompass = ({ leftScore, centerScore, rightScore, totalVotes }: PoliticalCompassProps) => {
  // Calculate percentages
  const total = leftScore + centerScore + rightScore || 1;
  const leftPercent = (leftScore / total) * 100;
  const centerPercent = (centerScore / total) * 100;
  const rightPercent = (rightScore / total) * 100;

  // Determine dominant leaning
  const getDominantLeaning = () => {
    if (leftScore > centerScore && leftScore > rightScore) return "left";
    if (rightScore > centerScore && rightScore > leftScore) return "right";
    return "center";
  };

  const dominant = getDominantLeaning();

  const getLeaningLabel = () => {
    const diff = Math.abs(leftScore - rightScore);
    if (diff <= 1) return "Balanced Center";
    if (dominant === "left") return leftScore - rightScore > 3 ? "Strong Left" : "Leans Left";
    if (dominant === "right") return rightScore - leftScore > 3 ? "Strong Right" : "Leans Right";
    return "Center";
  };

  const getLeaningIcon = () => {
    if (dominant === "left") return <TrendingUp className="h-4 w-4 rotate-45" />;
    if (dominant === "right") return <TrendingDown className="h-4 w-4 rotate-45" />;
    return <Minus className="h-4 w-4" />;
  };

  const getLeaningColor = () => {
    if (dominant === "left") return "bg-left-lean text-left-lean-foreground";
    if (dominant === "right") return "bg-right-lean text-right-lean-foreground";
    return "bg-center-lean text-center-lean-foreground";
  };

  // Calculate position for single bar (-50 to +50, where -50 is far left, 0 is center, +50 is far right)
  const getCompassPosition = () => {
    if (totalVotes === 0) return 0;
    const totalWeight = leftScore + rightScore + centerScore;
    if (totalWeight === 0) return 0;
    
    // Weight the positions: left = -1, center = 0, right = +1
    const weightedScore = (rightScore - leftScore) / totalWeight;
    return Math.max(-50, Math.min(50, weightedScore * 50));
  };

  const position = getCompassPosition();

  return (
    <div className="bg-card rounded-lg p-6 shadow-[var(--news-card-shadow)] mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Political Compass</h2>
          <p className="text-sm text-muted-foreground">
            Based on {totalVotes} article{totalVotes !== 1 ? 's' : ''} reviewed
          </p>
        </div>
        <Badge className={`${getLeaningColor()} animate-pulse-glow`}>
          <div className="flex items-center gap-1">
            {getLeaningIcon()}
            {getLeaningLabel()}
          </div>
        </Badge>
      </div>

      {/* Single Political Compass Bar */}
      <div className="relative">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>Liberal</span>
          <span>Moderate</span>
          <span>Conservative</span>
        </div>
        
        <div className="relative h-4 bg-gradient-to-r from-left-lean via-center-lean to-right-lean rounded-full overflow-hidden">
          {/* Position indicator */}
          <div 
            className="absolute top-0 w-4 h-4 bg-white border-2 border-foreground rounded-full shadow-lg transition-all duration-[2000ms] ease-out"
            style={{ 
              left: `calc(${((position + 50) / 100) * 100}% - 8px)`,
              transform: 'translateY(0)'
            }}
          />
        </div>
        
        {/* Center line */}
        <div className="absolute top-6 left-1/2 w-px h-4 bg-muted-foreground/30 transform -translate-x-px" />
      </div>

      {totalVotes === 0 && (
        <p className="text-center text-muted-foreground mt-4 text-sm">
          Start swiping articles to see your political compass!
        </p>
      )}
    </div>
  );
};