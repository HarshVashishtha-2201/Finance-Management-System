import jsPDF from 'jspdf';
import { Transaction, Category } from '../types/finance';
import { format } from 'date-fns';
import { calculateTotals, formatCurrency } from './financeCalculations';

export const exportToPDF = (transactions: Transaction[], categories: Category[]) => {
  const doc = new jsPDF();
  const totals = calculateTotals(transactions);
  
  // Title
  doc.setFontSize(20);
  doc.text('Finance Report', 20, 20);
  
  // Date
  doc.setFontSize(10);
  doc.text(`Generated on: ${format(new Date(), 'PPP')}`, 20, 30);
  
  // Summary
  doc.setFontSize(14);
  doc.text('Financial Summary', 20, 45);
  doc.setFontSize(10);
  doc.text(`Total Income: ${formatCurrency(totals.income)}`, 20, 55);
  doc.text(`Total Expenses: ${formatCurrency(totals.expenses)}`, 20, 62);
  doc.text(`Net Balance: ${formatCurrency(totals.net)}`, 20, 69);
  
  // Recent Transactions
  doc.setFontSize(14);
  doc.text('Recent Transactions', 20, 85);
  
  let yPosition = 95;
  const recentTransactions = transactions.slice(0, 20);
  
  recentTransactions.forEach((transaction) => {
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(9);
    const dateStr = format(new Date(transaction.date), 'MM/dd/yyyy');
    const amountStr = `${transaction.type === 'expense' ? '-' : '+'}${formatCurrency(transaction.amount)}`;
    
    doc.text(`${dateStr} | ${transaction.category} | ${transaction.description}`, 20, yPosition);
    doc.text(amountStr, 160, yPosition);
    yPosition += 7;
  });
  
  doc.save('finance-report.pdf');
};

export const exportToCSV = (transactions: Transaction[]) => {
  const headers = ['Date', 'Type', 'Category', 'Description', 'Amount'];
  const csvContent = [
    headers.join(','),
    ...transactions.map(t => [
      format(new Date(t.date), 'yyyy-MM-dd'),
      t.type,
      t.category,
      `"${t.description}"`,
      t.amount.toString()
    ].join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `transactions-${format(new Date(), 'yyyy-MM-dd')}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};