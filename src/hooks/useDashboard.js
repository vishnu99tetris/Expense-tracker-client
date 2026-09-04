'use client';

import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getExpenses, getExpenseSummary } from '@/actions/expense';
import { getCurrentBudget } from '@/actions/budget';
import { getErrorMessage } from '@/utils/helpers';

export function useDashboard() {
  const { user, token, loading: authLoading } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState(null);
  const [budgetData, setBudgetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = useCallback(async () => {
    if (!token && !user) {
      setLoading(false);
      return;
    }
    try {
      setError(null);
      const [expRes, sumRes, budRes] = await Promise.all([
        getExpenses(),
        getExpenseSummary(),
        getCurrentBudget(),
      ]);
      setExpenses(expRes.data?.data || []);
      setSummary(sumRes.data?.data || null);
      setBudgetData(budRes.data?.data || null);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setError(getErrorMessage(err, 'Failed to load dashboard data.'));
    } finally {
      setLoading(false);
    }
  }, [token, user]);

  useEffect(() => {
    if (!authLoading) {
      if (token || user) {
        fetchDashboardData();
      } else {
        setLoading(false);
      }
    }
  }, [authLoading, token, user, fetchDashboardData]);

  return {
    expenses,
    summary,
    budgetData,
    loading: loading || authLoading,
    error,
    refreshDashboard: fetchDashboardData,
  };
}

