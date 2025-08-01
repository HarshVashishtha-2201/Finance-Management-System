import { Transaction, MonthlyData, CategoryData } from '../types/finance';
import { format, startOfMonth, endOfMonth, eachMonthOfInterval, subMonths } from 'date-fns';

export const calculateTotals = (transactions: Transaction[]) => {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  return {
    income,
    expenses,
    net: income - expenses,
  };
};

export const getMonthlyData = (transactions: Transaction[], months: number = 6): MonthlyData[] => {
  const endDate = new Date();
  const startDate = subMonths(endDate, months - 1);
  
  const monthsArray = eachMonthOfInterval({ start: startDate, end: endDate });
  
  return monthsArray.map(monthDate => {
    const monthStart = startOfMonth(monthDate);
    const monthEnd = endOfMonth(monthDate);
    
    const monthTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate >= monthStart && transactionDate <= monthEnd;
    });
    
    const income = monthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = monthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return {
      month: format(monthDate, 'MMM yyyy'),
      income,
      expenses,
      net: income - expenses,
    };
  });
};

export const getCategoryData = (
  transactions: Transaction[], 
  categories: any[], 
  type: 'income' | 'expense'
): CategoryData[] => {
  const categoryTotals = transactions
    .filter(t => t.type === type)
    .reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {} as Record<string, number>);

  return Object.entries(categoryTotals)
    .map(([categoryName, amount]) => {
      const category = categories.find(c => c.name === categoryName);
      return {
        name: categoryName,
        value: amount,
        color: category?.color || '#6B7280',
      };
    })
    .sort((a, b) => b.value - a.value);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};