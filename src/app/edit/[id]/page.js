'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import ExpenseForm from '@/components/ExpenseForm';
import Loader from '@/components/Loader';
import { getExpenseById, updateExpense } from '@/actions/expense';
import { getErrorMessage } from '@/utils/helpers';

export default function EditExpensePage() {
  const { id } = useParams();
  const router = useRouter();
  const [expense, setExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const res = await getExpenseById(id);
        setExpense(res.data.data);
      } catch (err) {
        setError(getErrorMessage(err, 'Expense not found.'));
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchExpense();
  }, [id]);

  const handleSubmit = async (data) => {
    setSaving(true);
    try {
      await updateExpense(id, data);
      router.push('/');
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to update expense.'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Edit Expense</h1>
          <p className="text-sm text-muted mt-1">Update your expense details.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader />
          </div>
        ) : error ? (
          <div className="glass-card p-8 text-center">
            <p className="text-danger mb-4">{error}</p>
            <button
              onClick={() => router.push('/')}
              className="gradient-btn px-5 py-2 rounded-lg text-white text-sm font-medium cursor-pointer"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <div className="glass-card p-6">
            <ExpenseForm
              initialData={expense}
              onSubmit={handleSubmit}
              isLoading={saving}
            />
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
