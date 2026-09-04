'use client';

import { CATEGORY_CONFIG } from '@/constants/categories';

export default function CategoryBadge({ category }) {
  const config = CATEGORY_CONFIG[category] || CATEGORY_CONFIG.Other;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}/15 ${config.text}`}
    >
      {config.label}
    </span>
  );
}
