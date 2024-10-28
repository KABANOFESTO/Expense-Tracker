import React from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-64 bg-blue-600 text-white flex flex-col p-4">
        <h2 className="text-2xl font-semibold mb-4">Expense Tracker</h2>
        <nav className="flex flex-col gap-4 mt-6">
          <Link to="/dashboard/add-expense" className="hover:text-blue-200">Add Expense</Link>
          <Link to="/dashboard/expense-list" className="hover:text-blue-200">Expense List</Link>
        </nav>
      </div>

      <div className="flex-1 p-6">

        <header className="bg-white shadow p-4 rounded-lg flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="text-blue-600 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </header>

        <main className="mt-6">
          <Routes>
            <Route path="add-expense" element={<ExpenseForm />} />
            <Route path="expense-list" element={<ExpenseList />} />
            <Route path="" element={<DashboardHome />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const DashboardHome = () => {
  const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
  const totalExpenses = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <p className="text-3xl font-bold text-blue-600">${totalExpenses.toFixed(2)}</p>
        <p className="text-gray-600">Total Expenses</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <Link 
            to="/dashboard/add-expense"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Expense
          </Link>
          <Link 
            to="/dashboard/expense-list"
            className="bg-gray-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            View All
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;