import { Newspaper, Scale } from "lucide-react";

export const NewsHeader = () => {
  return (
    <header className="bg-[var(--news-header)] text-primary-foreground">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="flex items-center gap-2">
            <Scale className="h-8 w-8" />
            <Newspaper className="h-8 w-8" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center mb-2">
          Spectrum News
        </h1>
        <p className="text-center text-primary-foreground/90 text-lg">
          News from all perspectives • See the full picture
        </p>
      </div>
    </header>
  );
};