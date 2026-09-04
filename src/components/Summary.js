'use client';

import { CATEGORY_COLORS } from '@/constants/categories';
import { formatCurrency } from '@/utils/formatters';

export default function Summary({ data }) {
  if (!data) return null;

  const { total, count, categories } = data;

  return (
    <div className="glass-card p-5">
      <h2 className="text-sm font-medium text-muted uppercase tracking-wider mb-4">
        Monthly Breakdown
      </h2>

      {/* Total */}
      <div className="mb-5">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold gradient-text">{formatCurrency(total)}</span>
          <span className="text-sm text-muted">
            from {count} expense{count !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Category Bars */}
      {categories && categories.length > 0 ? (
        <div className="space-y-3">
          {categories.map((cat) => {
            const percentage = total > 0 ? (cat.total / total) * 100 : 0;
            const colorClass = CATEGORY_COLORS[cat.category] || 'bg-other';

            return (
              <div key={cat.category}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted">{cat.category}</span>
                  <span className="font-medium text-foreground">{formatCurrency(cat.total)}</span>
                </div>
                <div className="h-2 bg-surface rounded-full overflow-hidden">
                  <div
                    className={`h-full ${colorClass} rounded-full transition-all duration-700 ease-out`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-muted">No expenses this month.</p>
      )}
    </div>
  );
}
