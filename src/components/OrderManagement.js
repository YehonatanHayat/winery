import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]); // כל ההזמנות
  const [selectedOrder, setSelectedOrder] = useState(null); // חלון התשלום
  const [paymentDetails, setPaymentDetails] = useState({ method: '', paidTo: '' }); // פרטי התשלום
  const [message, setMessage] = useState(''); // הודעת הצלחה/שגיאה

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('❌ No token found');
      navigate('/info');
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, [message]);

  // ביטול הזמנה
  const handleCancelOrder = async (orderId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to cancel order.');

      setMessage('Order canceled successfully.');
      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (err) {
      console.error('Error canceling order:', err);
      setMessage('Failed to cancel order.');
    }
  };

  // פתיחת חלון התשלום להזמנה מסוימת
  const handleCompleteOrder = (order) => {
    setSelectedOrder(order);
  };

  // שמירת פרטי התשלום ושליחת ההזמנה כ"הושלמה"
  const submitPayment = async () => {
    const token = localStorage.getItem('token');
    if (!paymentDetails.method || !paymentDetails.paidTo) {
      alert('Please fill in all payment details.');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${selectedOrder._id}/complete`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(paymentDetails),
        }
      );

      if (!response.ok) throw new Error('Failed to complete order.');

      setMessage('Order marked as completed successfully.');
      setOrders(orders.filter((order) => order._id !== selectedOrder._id));
      setSelectedOrder(null);
      setPaymentDetails({ method: '', paidTo: '' });
    } catch (err) {
      console.error('Error completing order:', err);
      setMessage('Failed to complete order.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">📋 Order Management</h2>

        {/* רשימת הזמנות */}
        <ul>
          {orders.map((order) => (
            <li key={order._id} className="border-b py-4">
              <p>
                <strong>Customer:</strong> {order.customerName}
              </p>
              <p>
                <strong>Phone:</strong> {order.customerPhone}
              </p>
              <p>
                <strong>Address:</strong> {order.customerAddress}
              </p>
              <p>
                <strong>Total Price:</strong> ₪{order.totalPrice}
              </p>
              <div className="flex space-x-4 mt-2">
                <button
                  onClick={() => handleCancelOrder(order._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Cancel Order
                </button>
                <button
                  onClick={() => handleCompleteOrder(order)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Mark as Completed
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* הודעת הצלחה/שגיאה */}
        {message && (
          <p className="mt-4 text-center text-green-600 font-medium">{message}</p>
        )}

        {/* חלון תשלום */}
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
                onChange={(e) =>
                  setPaymentDetails({ ...paymentDetails, method: e.target.value })
                }
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

export default OrderManagement;
