'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import ExpenseForm from '@/components/ExpenseForm';
import { createExpense } from '@/actions/expense';

export default function AddExpensePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await createExpense(data);
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Add Expense</h1>
          <p className="text-sm text-muted mt-1">Record a new expense entry.</p>
        </div>

        <div className="glass-card p-6">
          <ExpenseForm onSubmit={handleSubmit} isLoading={loading} />
        </div>
      </div>
    </ProtectedRoute>
  );
}
