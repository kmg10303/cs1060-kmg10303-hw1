export type Bias = "left" | "center" | "right";

export const DOMAIN_MAP: Record<string, Bias> = {
  // left
  "nytimes.com": "left",
  "washingtonpost.com": "left",
  "cnn.com": "left",
  "msnbc.com": "left",
  "vox.com": "left",
  "huffpost.com": "left",
  "theguardian.com": "left",
  "motherjones.com": "left",
  "slate.com": "left",
  "newyorker.com": "left",
  "theatlantic.com": "left",
  "politico.com": "left",

  // center
  "reuters.com": "center",
  "apnews.com": "center",
  "associatedpress.com": "center",
  "bbc.com": "center",
  "bbc.co.uk": "center",
  "cnbc.com": "center",
  "npr.org": "center",
  "axios.com": "center",
  "time.com": "center",
  "usatoday.com": "center",
  "abcnews.go.com": "center",
  "cbsnews.com": "center",
  "nbcnews.com": "center",
  "latimes.com": "center",
  "bloomberg.com": "center",
  "ft.com": "center",
  "newsweek.com": "center",
  "businessinsider.com": "center",
  "fortune.com": "center",

  // right
  "foxnews.com": "right",
  "wsj.com": "right",
  "nationalreview.com": "right",
  "washingtonexaminer.com": "right",
  "nypost.com": "right",
  "washingtontimes.com": "right",
  "dailywire.com": "right",
  "thefederalist.com": "right",
  "spectator.org": "right",
};

export function inferBiasByDomain(host: string): Bias | null {
  const h = host.toLowerCase();
  if (DOMAIN_MAP[h]) return DOMAIN_MAP[h];
  const k = Object.keys(DOMAIN_MAP).find(d => h === d || h.endsWith("." + d));
  return k ? DOMAIN_MAP[k] : null;
}

export function mappedDomains(): string[] {
  return Object.keys(DOMAIN_MAP);
}
