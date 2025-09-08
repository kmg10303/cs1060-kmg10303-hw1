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

  return (
    <div className="bg-card rounded-lg p-6 shadow-[var(--news-card-shadow)] mb-6">
      <div className="flex items-center justify-between mb-4">
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

      <div className="space-y-3">
        {/* Left leaning */}
        <div className="flex items-center gap-3">
          <div className="w-16 text-sm font-medium text-left-lean">Left</div>
          <div className="flex-1 bg-left-lean-subtle rounded-full h-3">
            <div 
              className="bg-left-lean h-full rounded-full transition-all duration-500"
              style={{ width: `${leftPercent}%` }}
            />
          </div>
          <div className="w-12 text-sm text-right font-medium">{leftScore}</div>
        </div>

        {/* Center */}
        <div className="flex items-center gap-3">
          <div className="w-16 text-sm font-medium text-center-lean">Center</div>
          <div className="flex-1 bg-center-lean-subtle rounded-full h-3">
            <div 
              className="bg-center-lean h-full rounded-full transition-all duration-500"
              style={{ width: `${centerPercent}%` }}
            />
          </div>
          <div className="w-12 text-sm text-right font-medium">{centerScore}</div>
        </div>

        {/* Right leaning */}
        <div className="flex items-center gap-3">
          <div className="w-16 text-sm font-medium text-right-lean">Right</div>
          <div className="flex-1 bg-right-lean-subtle rounded-full h-3">
            <div 
              className="bg-right-lean h-full rounded-full transition-all duration-500"
              style={{ width: `${rightPercent}%` }}
            />
          </div>
          <div className="w-12 text-sm text-right font-medium">{rightScore}</div>
        </div>
      </div>

      {totalVotes === 0 && (
        <p className="text-center text-muted-foreground mt-4 text-sm">
          Start swiping articles to see your political compass!
        </p>
      )}
    </div>
  );
};