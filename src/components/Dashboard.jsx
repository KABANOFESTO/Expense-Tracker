import React from 'react';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white flex flex-col p-4">
        <h2 className="text-2xl font-semibold mb-4">Expense Tracker</h2>
        <nav className="flex flex-col gap-4 mt-6">
          <a href="#add-expense" className="hover:text-blue-200">Add Expense</a>
          <a href="#expense-list" className="hover:text-blue-200">Expense List</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <header className="bg-white shadow p-4 rounded-lg flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>
          <button
            onClick={() => localStorage.removeItem('isLoggedIn')}
            className="text-blue-600 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </header>

        {/* Main Dashboard Content */}
        <main className="mt-6 grid gap-8 grid-cols-1 lg:grid-cols-2">
          {/* Expense Form Section */}
          <section id="add-expense" className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add a New Expense</h2>
            <ExpenseForm />
          </section>

          {/* Expense List Section */}
          <section id="expense-list" className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Your Expenses</h2>
            <ExpenseList />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
