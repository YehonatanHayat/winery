import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState([]); // רשימת המלאי
  const [orders, setOrders] = useState([]); // רשימת ההזמנות
  const [newItem, setNewItem] = useState({ item: '', quantity: 0 }); // מוצר חדש להוספה
  const [message, setMessage] = useState(''); // הודעות הצלחה/שגיאה
  const [selectedOrder, setSelectedOrder] = useState(null); // תצוגת תשלום
  const [paymentDetails, setPaymentDetails] = useState({ method: '', paidTo: '' }); // פרטי תשלום

  const navigate = useNavigate(); // ניווט בין עמודים

  useEffect(() => {
    const token = localStorage.getItem('token'); // שליפת ה-token מה-localStorage

    if (!token) {
      console.error('❌ No token found');
      navigate('/info'); // אם אין טוקן, מעבירים לדף הבית/התחברות
      return;
    }

    const fetchInventory = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/inventory', {
          headers: { Authorization: `Bearer ${token}` }, // שליחת ה-token
        });
        const data = await res.json();
        setInventoryItems(data);
      } catch (err) {
        console.error('Error fetching inventory:', err);
      }
    };

    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/orders', {
          headers: { Authorization: `Bearer ${token}` }, // שליחת ה-token
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          console.error('Orders response is not an array:', data);
          setOrders([]);
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        setOrders([]);
      }
    };

    fetchInventory();
    fetchOrders();
  }, [message]);

  // הוספת פריט חדש למלאי
  const handleAddItem = async () => {
    const token = localStorage.getItem('token'); // שליפת ה-token
    if (!newItem.item || newItem.quantity <= 0) {
      alert('Please enter a valid item name and quantity.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // שליחת ה-token
        },
        body: JSON.stringify(newItem),
      });
      const data = await response.json();
      setMessage(data.message);
      setInventoryItems([...inventoryItems, { ...newItem, _id: data._id }]); // הוספת הפריט לרשימה
      setNewItem({ item: '', quantity: 0 });
    } catch (err) {
      console.error('Error adding item:', err);
      setMessage('Failed to add item.');
    }
  };

  // ביטול הזמנה
  const cancelOrder = async (order) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${order._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (data.error) {
        console.error('Error deleting order:', data.error);
        setMessage('Failed to cancel order.');
        return;
      }
      setMessage('Order canceled and inventory restored.');
    } catch (err) {
      console.error('Error canceling order:', err);
      setMessage('Failed to cancel order.');
    }
  };

  // סימון הזמנה כ"בוצעה"
  const handleCompleteOrder = (order) => {
    setSelectedOrder(order);
  };

  const submitPayment = async () => {
    const token = localStorage.getItem('token');
    if (!paymentDetails.method || !paymentDetails.paidTo) {
      alert('Please fill in all payment details.');
      return;
    }

    try {
      await fetch(`http://localhost:5000/api/orders/${selectedOrder._id}/complete`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentDetails),
      });
      setMessage('Order marked as completed with payment details.');
      setOrders(orders.filter((order) => order._id !== selectedOrder._id));
      setSelectedOrder(null);
      setPaymentDetails({ method: '', paidTo: '' });
    } catch (err) {
      console.error('Error completing order:', err);
      setMessage('Failed to complete order.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg relative">
        <h2 className="text-3xl font-bold mb-6 text-center">🍷 Inventory Management</h2>

        {/* רשימת מלאי */}
        <h3 className="text-2xl font-bold">📦 Inventory</h3>
        <ul>
          {inventoryItems.map((item) => (
            <li key={item._id} className="flex justify-between py-2 border-b">
              <span>{item.item}</span>
              <span>{item.quantity} units</span>
            </li>
          ))}
        </ul>

        {/* טופס להוספת פריט */}
        {localStorage.getItem('userRole') === 'admin' && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">➕ Add New Item</h3>
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Item Name"
                value={newItem.item}
                onChange={(e) => setNewItem({ ...newItem, item: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="number"
                placeholder="Quantity"
                min="0"
                value={newItem.quantity}
                onChange={(e) =>
                  setNewItem({ ...newItem, quantity: parseInt(e.target.value, 10) || 0 })
                }
                className="w-full px-4 py-2 border rounded-lg"
              />
              <button
                onClick={handleAddItem}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Add Item
              </button>
            </div>
            {message && (
              <p className="mt-4 text-center text-green-600 font-medium">{message}</p>
            )}
          </div>
        )}

        {/* הערות לא רלוונטיות */}
        {/* חלקים כמו הוספת הזמנה או ביטול הזמנה יכולים להיות ממוזערים כאן בהתאם לדרישות */}

        {/* Modal לתשלום */}
        {selectedOrder && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg relative">
              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              >
                ✖
              </button>
              <h3 className="text-2xl font-bold mb-4">Payment Details</h3>
              <select
                value={paymentDetails.method}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, method: e.target.value })}
                className="border p-2 mb-4 w-full rounded"
              >
                <option value="">Select Payment Method</option>
                <option value="Cash">Cash</option>
                <option value="Bit">Bit</option>
                <option value="PayBox">PayBox</option>
              </select>
              <input
                type="text"
                placeholder="Paid To"
                value={paymentDetails.paidTo}
                onChange={(e) =>
                  setPaymentDetails({ ...paymentDetails, paidTo: e.target.value })
                }
                className="border p-2 mb-4 w-full rounded"
              />
              <button
                onClick={submitPayment}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Submit Payment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;

