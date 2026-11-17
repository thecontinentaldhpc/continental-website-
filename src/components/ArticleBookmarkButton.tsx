import React, { useState } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import type { SavedArticleInput } from '../lib/readingList';

export interface ArticleBookmarkButtonProps {
  article: SavedArticleInput;
  variant?: 'icon' | 'pillless';
  className?: string;
}

export function ArticleBookmarkButton({
  article,
  variant = 'icon',
  className = '',
}: ArticleBookmarkButtonProps) {
  const { user, openLoginModal, isArticleSaved, toggleSaveArticle } = useSite();
  const [busy, setBusy] = useState(false);

  const saved = isArticleSaved(article.id);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      openLoginModal(`/article/${article.slug}`);
      return;
    }
    if (busy) return;
    setBusy(true);
    try {
      await toggleSaveArticle(article);
    } finally {
      setBusy(false);
    }
  };

  if (variant === 'pillless') {
    return (
      <button
        type="button"
        onClick={handleClick}
        disabled={busy}
        aria-pressed={saved}
        aria-label={saved ? `Remove "${article.title}" from reading list` : `Save "${article.title}" for later`}
        className={`inline-flex items-center gap-1.5 text-xs font-semibold transition-colors disabled:opacity-50 ${
          saved
            ? 'text-[#8C1D24] dark:text-[#eb7a80]'
            : 'text-neutral-600 dark:text-neutral-400 hover:text-[#8C1D24] dark:hover:text-[#eb7a80]'
        } ${className}`}
      >
        {saved ? <BookmarkCheck className="w-3.5 h-3.5 shrink-0" /> : <Bookmark className="w-3.5 h-3.5 shrink-0" />}
        <span>{busy ? 'Saving...' : saved ? 'Saved' : 'Save'}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={busy}
      aria-pressed={saved}
      aria-label={saved ? `Remove "${article.title}" from reading list` : `Save "${article.title}" for later`}
      title={saved ? 'Saved to Reading List' : 'Save for Later'}
      className={`inline-flex items-center justify-center p-1.5 transition-colors disabled:opacity-50 ${
        saved
          ? 'text-[#8C1D24] dark:text-[#eb7a80]'
          : 'text-neutral-400 dark:text-neutral-500 hover:text-[#8C1D24] dark:hover:text-[#eb7a80]'
      } ${className}`}
    >
      {saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
    </button>
  );
}
