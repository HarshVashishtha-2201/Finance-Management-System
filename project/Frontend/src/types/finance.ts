export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
  icon: string;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  net: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}