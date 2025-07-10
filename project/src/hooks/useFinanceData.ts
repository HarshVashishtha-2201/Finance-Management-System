import { useState, useEffect } from 'react';
import { Transaction, Category } from '../types/finance';

const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'Salary', type: 'income', color: '#10B981', icon: 'Banknote' },
  { id: '2', name: 'Freelance', type: 'income', color: '#059669', icon: 'Laptop' },
  { id: '3', name: 'Investment', type: 'income', color: '#047857', icon: 'TrendingUp' },
  { id: '4', name: 'Food & Dining', type: 'expense', color: '#EF4444', icon: 'UtensilsCrossed' },
  { id: '5', name: 'Transportation', type: 'expense', color: '#F97316', icon: 'Car' },
  { id: '6', name: 'Shopping', type: 'expense', color: '#8B5CF6', icon: 'ShoppingBag' },
  { id: '7', name: 'Bills & Utilities', type: 'expense', color: '#06B6D4', icon: 'Receipt' },
  { id: '8', name: 'Healthcare', type: 'expense', color: '#EC4899', icon: 'Heart' },
];

export const useFinanceData = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);

  useEffect(() => {
    const savedTransactions = localStorage.getItem('financeTransactions');
    const savedCategories = localStorage.getItem('financeCategories');
    
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
    
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('financeTransactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('financeCategories', JSON.stringify(categories));
  }, [categories]);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions(prev => 
      prev.map(transaction => 
        transaction.id === id ? { ...transaction, ...updates } : transaction
      )
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(transaction => transaction.id !== id));
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString(),
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories(prev => 
      prev.map(category => 
        category.id === id ? { ...category, ...updates } : category
      )
    );
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(category => category.id !== id));
  };

  return {
    transactions,
    categories,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addCategory,
    updateCategory,
    deleteCategory,
  };
};