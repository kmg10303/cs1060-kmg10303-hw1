import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Clock } from "lucide-react";

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  source: string;
  bias: "left" | "center" | "right";
  url: string;
  publishedAt: string;
  imageUrl?: string;
}

interface NewsCardProps {
  article: NewsArticle;
}

const getBiasColor = (bias: NewsArticle["bias"]) => {
  switch (bias) {
    case "left":
      return "bg-left-lean text-left-lean-foreground hover:bg-left-lean/90";
    case "center":
      return "bg-center-lean text-center-lean-foreground hover:bg-center-lean/90";
    case "right":
      return "bg-right-lean text-right-lean-foreground hover:bg-right-lean/90";
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

export const NewsCard = ({ article }: NewsCardProps) => {
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

  return (
    <Card className="group cursor-pointer transition-all duration-200 hover:shadow-[var(--news-card-hover-shadow)] shadow-[var(--news-card-shadow)]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3 mb-2">
          <Badge className={`${getBiasColor(article.bias)} text-xs font-medium`}>
            {getBiasLabel(article.bias)}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {formatDate(article.publishedAt)}
          </div>
        </div>
        <h3 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
          {article.title}
        </h3>
      </CardHeader>
      <CardContent className="pt-0">
        {article.imageUrl && (
          <div className="mb-3 overflow-hidden rounded-lg">
            <img 
              src={article.imageUrl} 
              alt={article.title}
              className="w-full h-48 object-cover transition-transform duration-200 group-hover:scale-105"
            />
          </div>
        )}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-3 leading-relaxed">
          {article.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-foreground">
            {article.source}
          </div>
          <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </CardContent>
    </Card>
  );
};