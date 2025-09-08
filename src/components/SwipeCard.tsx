import { motion, PanInfo } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ThumbsUp, ThumbsDown } from "lucide-react";
import { NewsArticle } from "./NewsCard";

interface SwipeCardProps {
  article: NewsArticle;
  onSwipe: (direction: "left" | "right", article: NewsArticle) => void;
  onTap: (article: NewsArticle) => void;
  index: number;
}

const getBiasColor = (bias: NewsArticle["bias"]) => {
  switch (bias) {
    case "left":
      return "bg-left-lean text-left-lean-foreground";
    case "center":
      return "bg-center-lean text-center-lean-foreground";
    case "right":
      return "bg-right-lean text-right-lean-foreground";
  }
};

const getBiasLabel = (bias: NewsArticle["bias"]) => {
  switch (bias) {
    case "left":
      return "Left Lean";
    case "center":
      return "Center";
    case "right":
      return "Right Lean";
  }
};

export const SwipeCard = ({ article, onSwipe, onTap, index }: SwipeCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    
    if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return `${Math.ceil(diffHours / 24)}d ago`;
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 100;
    if (info.offset.x > swipeThreshold) {
      onSwipe("right", article);
    } else if (info.offset.x < -swipeThreshold) {
      onSwipe("left", article);
    }
  };

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ zIndex: 10 - index }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.05, rotate: 5 }}
      animate={{ 
        scale: 1 - index * 0.05,
        y: index * 10,
        opacity: 1 - index * 0.3 
      }}
      exit={{
        x: 300,
        opacity: 0,
        transition: { duration: 0.3 }
      }}
      initial={{ x: 300, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      onClick={() => onTap(article)}
    >
      {/* Swipe indicators */}
      <motion.div 
        className="absolute inset-0 bg-green-500/20 rounded-lg flex items-center justify-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        whileDrag={{ opacity: 1 }}
      >
        <div className="flex items-center gap-2 text-green-600 text-xl font-bold">
          <ThumbsUp className="h-8 w-8" />
          APPROVE
        </div>
      </motion.div>

      <motion.div 
        className="absolute inset-0 bg-red-500/20 rounded-lg flex items-center justify-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        whileDrag={{ opacity: 1 }}
      >
        <div className="flex items-center gap-2 text-red-600 text-xl font-bold">
          <ThumbsDown className="h-8 w-8" />
          REJECT
        </div>
      </motion.div>

      <Card className="h-full shadow-[var(--news-card-shadow)] border-2 bg-card">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-3 mb-3">
            <Badge className={`${getBiasColor(article.bias)} text-xs font-medium`}>
              {getBiasLabel(article.bias)}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {formatDate(article.publishedAt)}
            </div>
          </div>
          <h3 className="text-xl font-bold leading-tight text-foreground">
            {article.title}
          </h3>
        </CardHeader>
        
        <CardContent className="pt-0 flex flex-col h-full">
          {article.imageUrl && (
            <div className="mb-4 overflow-hidden rounded-lg flex-shrink-0">
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-48 object-cover"
                draggable={false}
              />
            </div>
          )}
          
          <div className="flex-1 flex flex-col">
            <p className="text-muted-foreground mb-4 leading-relaxed flex-1">
              {article.description}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm font-medium text-foreground">
                {article.source}
              </div>
              <div className="text-xs text-muted-foreground">
                Swipe → Approve • Swipe ← Reject
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};