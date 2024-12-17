import React, { useState, useEffect } from 'react';

const Finance = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [receipts, setReceipts] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    category: '',
    amount: '',
    quantity: '',
    description: '',
  });

  // Fetch income and expenses from server
  useEffect(() => {
    const fetchFinanceData = async () => {
      try {
        const token = localStorage.getItem('token'); // שליפת ה-token מה-localStorage
  
        if (!token) {
          console.error('❌ No token found in localStorage');
          return;
        }
  
        // Fetch total income
        const incomeRes = await fetch('http://localhost:5000/api/finance/income', {
          headers: { Authorization: `Bearer ${token}` }, // הוספת ה-token לכותרת
        });
  
        if (!incomeRes.ok) {
          throw new Error('Failed to fetch income data');
        }
  
        const incomeData = await incomeRes.json();
        setTotalIncome(incomeData.totalIncome || 0);
        setReceipts(incomeData.receipts || []);
  
        // Fetch expenses
        const expenseRes = await fetch('http://localhost:5000/api/finance/expenses', {
          headers: { Authorization: `Bearer ${token}` }, // הוספת ה-token לכותרת
        });
  
        if (!expenseRes.ok) {
          throw new Error('Failed to fetch expenses data');
        }
  
        const expenseData = await expenseRes.json();
        setTotalExpenses(expenseData.totalExpenses || 0);
        setExpenses(expenseData.expenses || []);
      } catch (err) {
        console.error('❌ Error fetching finance data:', err.message);
      }
    };
  
    fetchFinanceData();
  }, []);

  // Add new expense
  const handleAddExpense = async () => {
    // בדיקת תקינות של כל השדות
    if (!newExpense.category.trim()) {
      alert('Category is required.');
      return;
    }
    if (!newExpense.amount || isNaN(newExpense.amount) || newExpense.amount <= 0) {
      alert('Amount must be a positive number.');
      return;
    }
    if (!newExpense.quantity || isNaN(newExpense.quantity) || newExpense.quantity <= 0) {
      alert('Quantity must be a positive integer.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/finance/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExpense),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add expense');
      }
  
      const data = await response.json();
      setExpenses([...expenses, data.expense]);
      setTotalExpenses(totalExpenses + parseFloat(newExpense.amount));
      setNewExpense({ category: '', amount: '', quantity: '', description: '' });
    } catch (err) {
      console.error('Error adding expense:', err.message);
      alert(err.message);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">📊 Financial Management</h2>

        {/* Income Summary */}
        <h3 className="text-2xl font-bold mb-4">💰 Total Income: ₪{totalIncome}</h3>

        {/* Expenses Summary */}
        <h3 className="text-2xl font-bold mb-4">💸 Total Expenses: ₪{totalExpenses}</h3>

        {/* Add Expense */}
        <div className="mb-6">
          <h4 className="text-xl font-semibold mb-2">Add Expense</h4>
          <input
            type="text"
            placeholder="Category"
            value={newExpense.category}
            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
            className="border p-2 mr-2 rounded"
          />
          <input
            type="number"
            placeholder="Amount"
            value={newExpense.amount}
            min="0"
            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            className="border p-2 mr-2 rounded"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newExpense.quantity}
            min="0"
            onChange={(e) => setNewExpense({ ...newExpense, quantity: e.target.value })}
            className="border p-2 mr-2 rounded"
          />
          <input
            type="text"
            placeholder="Description"
            value={newExpense.description}
            onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
            className="border p-2 mr-2 rounded"
          />
          <button
            onClick={handleAddExpense}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Expense
          </button>
        </div>

        {/* Expenses List */}
        <h4 className="text-xl font-semibold mb-2">Expense List</h4>
        <ul>
        {expenses.map((expense, index) => {
            if (!expense || !expense.category) {
            console.log(`❌ Invalid expense at index ${index}:`, expense);
            return (
                <li key={index} className="text-red-500">
                Invalid Expense Data
                </li>
            );
            }
            return (
            <li key={expense._id || index} className="flex justify-between py-2 border-b">
                <span>{expense.category}</span>
                <span>₪{expense.amount}</span>
                <span>Quantity: {expense.quantity}</span>
                <span>{expense.description}</span>
                <span>{new Date(expense.date).toLocaleDateString()}</span>
            </li>
            );
        })}
        </ul>

      </div>
    </div>
  );
};

export default Finance;
