import React from 'react';
import { Transaction, Category } from '../types/finance';
import { exportToPDF, exportToCSV } from '../utils/exportUtils';
import { Download, FileText, Table } from 'lucide-react';

interface ExportToolsProps {
  transactions: Transaction[];
  categories: Category[];
}

const ExportTools: React.FC<ExportToolsProps> = ({ transactions, categories }) => {
  const handleExportPDF = () => {
    exportToPDF(transactions, categories);
  };

  const handleExportCSV = () => {
    exportToCSV(transactions);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center mb-4">
        <Download className="w-5 h-5 text-gray-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Export Data</h2>
      </div>
      
      <p className="text-gray-600 mb-6">Download your financial data in different formats</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={handleExportPDF}
          className="flex items-center justify-center px-6 py-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors group"
        >
          <FileText className="w-6 h-6 text-red-600 mr-3 group-hover:scale-110 transition-transform" />
          <div className="text-left">
            <p className="font-medium text-red-900">Export as PDF</p>
            <p className="text-sm text-red-600">Financial report with summary</p>
          </div>
        </button>
        
        <button
          onClick={handleExportCSV}
          className="flex items-center justify-center px-6 py-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors group"
        >
          <Table className="w-6 h-6 text-green-600 mr-3 group-hover:scale-110 transition-transform" />
          <div className="text-left">
            <p className="font-medium text-green-900">Export as CSV</p>
            <p className="text-sm text-green-600">Raw transaction data</p>
          </div>
        </button>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">Export Information</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• PDF includes financial summary and recent transactions</li>
          <li>• CSV contains all transaction data for spreadsheet analysis</li>
          <li>• Data is exported as of {new Date().toLocaleDateString()}</li>
        </ul>
      </div>
    </div>
  );
};

export default ExportTools;