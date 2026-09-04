'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import BudgetCard from '@/components/BudgetCard';
import Summary from '@/components/Summary';
import ExpenseList from '@/components/ExpenseList';
import Loader from '@/components/Loader';
import { useDashboard } from '@/hooks/useDashboard';
import { getMonthName } from '@/utils/formatters';

export default function DashboardPage() {
  const { expenses, summary, budgetData, loading, refreshDashboard } = useDashboard();
  const currentMonthName = getMonthName(new Date().getMonth() + 1, new Date().getFullYear());

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-sm text-muted mt-1">
                Your expense overview for {currentMonthName} {new Date().getFullYear()}
              </p>
            </div>

            {/* Budget + Summary Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <BudgetCard budgetData={budgetData} onUpdate={refreshDashboard} />
              <Summary data={summary} />
            </div>

            {/* Expense List */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Recent Expenses</h2>
                <span className="text-sm text-muted">
                  {expenses.length} total
                </span>
              </div>
              <ExpenseList expenses={expenses} onRefresh={refreshDashboard} />
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
