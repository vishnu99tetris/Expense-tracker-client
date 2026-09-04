'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ExpenseCard from './ExpenseCard';
import Modal from './Modal';
import { deleteExpense } from '@/actions/expense';

export default function ExpenseList({ expenses, onRefresh }) {
  const router = useRouter();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleEdit = (id) => {
    router.push(`/edit/${id}`);
  };

  const handleDeleteClick = (expense) => {
    setDeleteTarget(expense);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteExpense(deleteTarget.id);
      setDeleteTarget(null);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      setDeleting(false);
    }
  };

  if (!expenses || expenses.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="text-4xl mb-3">💸</div>
        <h3 className="text-lg font-medium text-foreground mb-1">No expenses yet</h3>
        <p className="text-sm text-muted mb-4">Start tracking by adding your first expense.</p>
        <button
          onClick={() => router.push('/add')}
          className="gradient-btn px-5 py-2 rounded-lg text-white text-sm font-medium cursor-pointer"
        >
          Add Expense
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {expenses.map((expense, index) => (
          <div
            key={expense.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <ExpenseCard
              expense={expense}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          </div>
        ))}
      </div>

      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Expense"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
      />
    </>
  );
}
