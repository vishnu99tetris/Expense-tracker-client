'use client';

import { useState } from 'react';
import { setBudget } from '@/actions/budget';
import { formatCurrency, formatPercentage, getMonthName } from '@/utils/formatters';
import { getErrorMessage } from '@/utils/helpers';

export default function BudgetCard({ budgetData, onUpdate }) {
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  if (!budgetData) return null;

  const { budget, totalSpent, remaining, percentUsed, month, year } = budgetData;
  const monthName = getMonthName(month, year);

  // Color logic: green < 80%, amber 80-100%, red >= 100%
  let barColor = 'bg-success';
  let textColor = 'text-success';
  if (percentUsed >= 100) {
    barColor = 'bg-danger';
    textColor = 'text-danger';
  } else if (percentUsed >= 80) {
    barColor = 'bg-warning';
    textColor = 'text-warning';
  }

  const handleSave = async () => {
    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || parsedAmount <= 0) {
      setError('Enter a valid budget amount.');
      return;
    }

    setSaving(true);
    setError('');
    try {
      await setBudget(month, year, parsedAmount);
      setShowModal(false);
      setAmount('');
      if (onUpdate) onUpdate();
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to set budget.'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-muted uppercase tracking-wider">
            {monthName} Budget
          </h2>
          <button
            onClick={() => {
              setAmount(budget?.toString() || '');
              setShowModal(true);
            }}
            className="text-xs text-accent hover:text-accent-hover transition-colors cursor-pointer"
          >
            {budget ? 'Edit' : '+ Set Budget'}
          </button>
        </div>

        {budget ? (
          <>
            {/* Budget amount */}
            <div className="text-3xl font-bold text-foreground mb-1">
              {formatCurrency(budget)}
            </div>

            {/* Progress bar */}
            <div className="h-3 bg-surface rounded-full overflow-hidden mb-3 mt-3">
              <div
                className={`h-full ${barColor} rounded-full transition-all duration-700 ease-out`}
                style={{ width: `${Math.min(percentUsed || 0, 100)}%` }}
              />
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">
                {formatPercentage(percentUsed)} used
              </span>
              <span className={`font-medium ${textColor}`}>
                {remaining >= 0
                  ? `${formatCurrency(remaining)} left`
                  : `${formatCurrency(Math.abs(remaining))} over`}
              </span>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="text-3xl mb-2">🎯</div>
            <p className="text-sm text-muted">Set a monthly budget to track your spending.</p>
          </div>
        )}
      </div>

      {/* Budget Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="glass-card p-6 w-full max-w-sm relative animate-slide-up">
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {budget ? 'Edit' : 'Set'} Monthly Budget
            </h3>
            <p className="text-sm text-muted mb-4">
              {monthName} {year}
            </p>

            {error && (
              <div className="p-2.5 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm mb-3">
                {error}
              </div>
            )}

            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setError('');
              }}
              placeholder="Enter budget amount"
              step="0.01"
              min="0"
              className="input-field mb-4"
              autoFocus
            />

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-muted hover:text-foreground hover:bg-surface-hover transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="gradient-btn px-4 py-2 rounded-lg text-white text-sm font-medium disabled:opacity-50 cursor-pointer"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
