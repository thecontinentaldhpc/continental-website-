import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Pause, Play } from 'lucide-react';
import type { Article } from '../types/publication';
import { useSite } from '../context/SiteContext';

export function BreakingNewsBar({ items }: { items: Article[] }) {
  const { settings } = useSite();
  const [paused, setPaused] = useState(false);

  if (!settings.breaking_ticker_enabled || items.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#FAF8F5] dark:bg-[#181818] border-b border-neutral-300 dark:border-neutral-800 no-print">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 flex items-center gap-3 sm:gap-4 py-2 overflow-hidden">
        <span className="bg-[#8C1D24] text-white text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 shrink-0">
          Breaking
        </span>
        <div className="flex-1 overflow-hidden relative">
          <div
            className="animate-ticker flex items-center gap-6"
            style={{ animationPlayState: paused ? 'paused' : undefined }}
          >
            {[...items, ...items].map((item, idx) => (
              <span key={`${item.id}-${idx}`} className="inline-flex items-center gap-6 shrink-0">
                <Link
                  to={`/article/${item.slug}`}
                  className="text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:text-[#8C1D24] dark:hover:text-[#eb7a80] whitespace-nowrap shrink-0 transition-colors"
                >
                  <span className="text-[#8C1D24] dark:text-[#eb7a80] font-semibold mr-2">{item.category_name}:</span>
                  {item.title}
                </Link>
                <span aria-hidden="true" className="text-neutral-400 dark:text-neutral-600 text-xs select-none">
                  •
                </span>
              </span>
            ))}
          </div>
        </div>
        <button
          type="button"
          data-testid="breaking-pause-btn"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? 'Resume breaking news ticker' : 'Pause breaking news ticker'}
          aria-pressed={paused}
          title={paused ? 'Resume ticker' : 'Pause ticker'}
          className="p-1.5 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#121212] text-neutral-700 dark:text-neutral-300 hover:border-neutral-900 dark:hover:border-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors shrink-0"
        >
          {paused ? <Play className="w-3 h-3" aria-hidden="true" /> : <Pause className="w-3 h-3" aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}
