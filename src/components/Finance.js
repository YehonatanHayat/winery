// import React, { useState, useEffect } from 'react';
// import API_BASE_URL from '../config';
// const Finance = () => {
//   const [totalIncome, setTotalIncome] = useState(0);
//   const [receipts, setReceipts] = useState([]);
//   const [totalExpenses, setTotalExpenses] = useState(0);
//   const [expenses, setExpenses] = useState([]);
//   const [newExpense, setNewExpense] = useState({
//     category: '',
//     price: '',
//     quantity: '',
//     description: '',
//   });

//   // Fetch income and expenses from server
//   useEffect(() => {
//     const fetchFinanceData = async () => {
//       try {
//         const token = localStorage.getItem('token');
  
//         if (!token) {
//           console.error('❌ No token found in localStorage');
//           return;
//         }
  
//         // Fetch total income
//         const incomeRes = await fetch(`${API_BASE_URL}/api/finance/income`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
  
//         if (!incomeRes.ok) {
//           throw new Error('Failed to fetch income data');
//         }
  
//         const incomeData = await incomeRes.json();
//         setTotalIncome(incomeData.totalIncome || 0);
//         setReceipts(incomeData.receipts || []);
  
//         // Fetch expenses
//         const expenseRes = await fetch(`${API_BASE_URL}/api/finance/expenses`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
  
//         if (!expenseRes.ok) {
//           throw new Error('Failed to fetch expenses data');
//         }
  
//         const expenseData = await expenseRes.json();
//         setTotalExpenses(expenseData.totalExpenses || 0);
//         setExpenses(expenseData.expenses || []);
//       } catch (err) {
//         console.error('❌ Error fetching finance data:', err.message);
//       }
//     };
  
//     fetchFinanceData();
//   }, []);

//   // Add new expense
//   const handleAddExpense = async () => {
//     if (!newExpense.category.trim()) {
//       alert('Category is required.');
//       return;
//     }
//     if (!newExpense.price || isNaN(newExpense.price) || newExpense.price <= 0) {
//       alert('price must be a positive number.');
//       return;
//     }
//     if (!newExpense.quantity || isNaN(newExpense.quantity) || newExpense.quantity <= 0) {
//       alert('Quantity must be a positive integer.');
//       return;
//     }
  
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/finance/expenses`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newExpense),
//       });
  
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to add expense');
//       }
  
//       const data = await response.json();
//       setExpenses([...expenses, data.expense]);
//       setTotalExpenses(totalExpenses + parseFloat(newExpense.price));
//       setNewExpense({ category: '', price: '', quantity: '', description: '' });
//     } catch (err) {
//       console.error('Error adding expense:', err.message);
//       alert(err.message);
//     }
//   };
  

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-3xl font-bold mb-6 text-center">📊 Financial Management</h2>

//         {/* Income Summary */}
//         <h3 className="text-2xl font-bold mb-4">💰 Total Income: ₪{totalIncome}</h3>

//         {/* Expenses Summary */}
//         <h3 className="text-2xl font-bold mb-4">💸 Total Expenses: ₪{totalExpenses}</h3>

//         {/* Add Expense */}
//         <div className="mb-6">
//           <h4 className="text-xl font-semibold mb-2">Add Expense</h4>
//           <input
//             type="text"
//             placeholder="Category"
//             value={newExpense.category}
//             onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
//             className="border p-2 mr-2 rounded"
//           />
//           <input
//             type="number"
//             placeholder="price"
//             value={newExpense.price}
//             min="0"
//             onChange={(e) => setNewExpense({ ...newExpense, price: e.target.value })}
//             className="border p-2 mr-2 rounded"
//           />
//           <input
//             type="number"
//             placeholder="Quantity"
//             value={newExpense.quantity}
//             min="0"
//             onChange={(e) => setNewExpense({ ...newExpense, quantity: e.target.value })}
//             className="border p-2 mr-2 rounded"
//           />
//           <input
//             type="text"
//             placeholder="Description"
//             value={newExpense.description}
//             onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
//             className="border p-2 mr-2 rounded"
//           />
//           <button
//             onClick={handleAddExpense}
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//           >
//             Add Expense
//           </button>
//         </div>

//         {/* Expenses List */}
//         <h4 className="text-xl font-semibold mb-2">Expense List</h4>
//         <ul>
//         {expenses.map((expense, index) => {
//             if (!expense || !expense.category) {
//             console.log(`❌ Invalid expense at index ${index}:`, expense);
//             return (
//                 <li key={index} className="text-red-500">
//                 Invalid Expense Data
//                 </li>
//             );
//             }
//             return (
//             <li key={expense._id || index} className="flex justify-between py-2 border-b">
//                 <span>{expense.category}</span>
//                 <span>₪{expense.price}</span>
//                 <span>Quantity: {expense.quantity}</span>
//                 <span>{expense.description}</span>
//                 <span>{new Date(expense.date).toLocaleDateString()}</span>
//             </li>
//             );
//         })}
//         </ul>

//       </div>
//     </div>
//   );
// };

// export default Finance;


import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config';

const Finance = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [receipts, setReceipts] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    category: '',
    price: '',
    quantity: '',
    description: '',
  });
  const [receiptFile, setReceiptFile] = useState(null); // New state for file upload
  const [selectedImage, setSelectedImage] = useState(null); // State for modal image

  // Fetch income and expenses from server
  useEffect(() => {
    const fetchFinanceData = async () => {
      try {
        const token = localStorage.getItem('token');
  
        if (!token) {
          console.error('❌ No token found in localStorage');
          return;
        }
  
        // Fetch total income
        const incomeRes = await fetch(`${API_BASE_URL}/api/finance/income`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (!incomeRes.ok) {
          throw new Error('Failed to fetch income data');
        }
  
        const incomeData = await incomeRes.json();
        setTotalIncome(incomeData.totalIncome || 0);
        setReceipts(incomeData.receipts || []);
  
        // Fetch expenses
        const expenseRes = await fetch(`${API_BASE_URL}/api/finance/expenses`, {
          headers: { Authorization: `Bearer ${token}` },
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

  // Add new expense with file upload
  const handleAddExpense = async () => {
    if (!newExpense.category.trim()) {
      alert('Category is required.');
      return;
    }
    if (!newExpense.price || isNaN(newExpense.price) || newExpense.price <= 0) {
      alert('Price must be a positive number.');
      return;
    }
    if (!newExpense.quantity || isNaN(newExpense.quantity) || newExpense.quantity <= 0) {
      alert('Quantity must be a positive integer.');
      return;
    }

    const formData = new FormData();
    formData.append('category', newExpense.category);
    formData.append('price', newExpense.price);
    formData.append('quantity', newExpense.quantity);
    formData.append('description', newExpense.description);
    if (receiptFile) {
      formData.append('receipt', receiptFile);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/finance/expenses`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add expense');
      }

      const data = await response.json();
      setExpenses([...expenses, data.expense]);
      setTotalExpenses(totalExpenses + parseFloat(newExpense.price));
      setNewExpense({ category: '', price: '', quantity: '', description: '' });
      setReceiptFile(null); // Reset file input
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
            placeholder="Price"
            value={newExpense.price}
            min="0"
            onChange={(e) => setNewExpense({ ...newExpense, price: e.target.value })}
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
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setReceiptFile(e.target.files[0])}
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
          {expenses.map((expense, index) => (
            <li key={expense._id || index} className="flex justify-between py-2 border-b">
              <span>{expense.category}</span>
              <span>₪{expense.price}</span>
              <span>Quantity: {expense.quantity}</span>
              <span>{expense.description}</span>
              <span>{new Date(expense.date).toLocaleDateString()}</span>
              {expense.receipt && (
                <img
                  src={`${API_BASE_URL}/${expense.receipt}`}
                  alt="Receipt"
                  onClick={() => setSelectedImage(`${API_BASE_URL}/${expense.receipt}`)} // Open modal on click
                  style={{ maxWidth: '100px', cursor: 'pointer', marginLeft: '10px' }}
                />
              )}
            </li>
          ))}
        </ul>

        {/* Modal for displaying selected image */}
        {selectedImage && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
            }}
            onClick={() => setSelectedImage(null)}
          >
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setSelectedImage(null)}
                style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  background: '#fff',
                  border: 'none',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
                }}
              >
                ✖
              </button>
              <img
                src={selectedImage}
                alt="Selected Receipt"
                style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: '8px' }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Finance;
