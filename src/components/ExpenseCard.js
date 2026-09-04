'use client';

import CategoryBadge from './CategoryBadge';
import { formatCurrency, formatDate } from '@/utils/formatters';

export default function ExpenseCard({ expense, onEdit, onDelete }) {
  const formattedDate = formatDate(expense.date);

  return (
    <div className="glass-card p-4 hover:border-border-light transition-all duration-200 group">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <h3 className="font-medium text-foreground truncate">{expense.title}</h3>
            <CategoryBadge category={expense.category} />
          </div>
          <div className="flex items-center gap-3 text-xs text-muted">
            <span>{formattedDate}</span>
            {expense.notes && (
              <>
                <span>•</span>
                <span className="truncate">{expense.notes}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-lg font-semibold text-foreground">
            {formatCurrency(expense.amount)}
          </span>

          {/* Actions — visible on hover (desktop) or always (mobile) */}
          <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(expense.id)}
              className="p-1.5 rounded-lg text-muted hover:text-accent hover:bg-accent/10 transition-all cursor-pointer"
              title="Edit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                <path d="m15 5 4 4" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(expense)}
              className="p-1.5 rounded-lg text-muted hover:text-danger hover:bg-danger/10 transition-all cursor-pointer"
              title="Delete"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" x2="10" y1="11" y2="17" />
                <line x1="14" x2="14" y1="11" y2="17" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
