import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Filter, Plus, TrendingDown } from 'lucide-react';
import { HiHome } from 'react-icons/hi'; 

const ExpenseList = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenses(savedExpenses);
    setFilteredExpenses(savedExpenses);
  }, []);

  const categories = ['all', ...new Set(expenses.map(expense => expense.category))];
  
  const months = ['all', ...new Set(expenses.map(expense => {
    const date = new Date(expense.date);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  }))];

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      const updatedExpenses = expenses.filter(expense => expense.id !== id);
      setExpenses(updatedExpenses);
      setFilteredExpenses(updatedExpenses);
      localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    }
  };

  const filterExpenses = () => {
    let filtered = [...expenses];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(expense => expense.category === selectedCategory);
    }

    if (selectedMonth !== 'all') {
      filtered = filtered.filter(expense => {
        const expenseMonth = new Date(expense.date).toISOString().slice(0, 7);
        return expenseMonth === selectedMonth;
      });
    }

    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'desc' 
          ? new Date(b.date) - new Date(a.date)
          : new Date(a.date) - new Date(b.date);
      } else if (sortBy === 'amount') {
        return sortOrder === 'desc' 
          ? b.amount - a.amount
          : a.amount - b.amount;
      }
      return 0;
    });

    setFilteredExpenses(filtered);
  };

  useEffect(() => {
    filterExpenses();
  }, [selectedCategory, selectedMonth, sortBy, sortOrder, expenses]);

  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const monthlyTotal = expenses
    .filter(expense => new Date(expense.date).getMonth() === new Date().getMonth())
    .reduce((sum, expense) => sum + Number(expense.amount), 0);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-4">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="flex items-center text-blue-500 hover:text-blue-700 transition-colors"
        >
          <HiHome className="w-6 h-6 mr-2" />
          Home
        </button>
      </div>

      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-600">Total Expenses</h3>
          <p className="text-2xl font-bold text-blue-800">${totalAmount.toFixed(2)}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-600">Monthly Total</h3>
          <p className="text-2xl font-bold text-green-800">${monthlyTotal.toFixed(2)}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-purple-600">Quick Action</h3>
            <p className="text-purple-800">Add New Expense</p>
          </div>
          <Link 
            to="/dashboard/add-expense"
            className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700"
          >
            <Plus size={20} />
          </Link>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-500" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => cat !== 'all' && (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="all">All Months</option>
          {months.map(month => month !== 'all' && (
            <option key={month} value={month}>
              {new Date(month).toLocaleString('default', { month: 'long', year: 'numeric' })}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2 ml-auto">
          <TrendingDown size={20} className="text-gray-500" />
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [newSortBy, newSortOrder] = e.target.value.split('-');
              setSortBy(newSortBy);
              setSortOrder(newSortOrder);
            }}
            className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
          </select>
        </div>
      </div>

      {filteredExpenses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No expenses found.</p>
          <Link 
            to="/dashboard/add-expense"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} />
            Add Your First Expense
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredExpenses.map((expense) => (
            <div 
              key={expense.id}
              className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow flex justify-between items-center gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-lg font-semibold">${Number(expense.amount).toFixed(2)}</span>
                  <span className="px-2 py-1 bg-blue-50 text-blue-600 text-sm rounded-full">
                    {expense.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-1">{expense.description}</p>
                <p className="text-gray-400 text-sm">
                  {new Date(expense.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              
              <button
                onClick={() => handleDelete(expense.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete expense"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
