import React, { useEffect, useState } from 'react';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenses(savedExpenses);
  }, []);

  const handleDelete = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  return (
    <div>
      {expenses.length === 0 ? (
        <p className="text-gray-500">No expenses added yet.</p>
      ) : (
        <ul className="space-y-4">
          {expenses.map((expense, index) => (
            <li key={index} className="p-4 bg-gray-50 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">${expense.amount}</p>
                <p className="text-gray-500">{expense.category} - {expense.date}</p>
                <p className="text-gray-600">{expense.description}</p>
              </div>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-600 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
