import React, { useState, useEffect } from 'react';

const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newItem, setNewItem] = useState({ item: '', quantity: 0 });
  const [message, setMessage] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({ method: '', paidTo: '' });

  // Fetch inventory and orders from server
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/inventory');
        const data = await res.json();
        setInventoryItems(data);
      } catch (err) {
        console.error('Error fetching inventory:', err);
      }
    };

    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/orders');
        const data = await res.json();
        console.log('Fetched orders:', data);

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

  // Add new item to inventory
  const handleAddItem = async () => {
    if (!newItem.item || newItem.quantity <= 0) {
      alert('Please enter a valid item name and quantity.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
      const data = await response.json();
      setMessage(data.message);
      setNewItem({ item: '', quantity: 0 });
    } catch (err) {
      console.error('Error adding item:', err);
      setMessage('Failed to add item.');
    }
  };

  // Cancel order and restore inventory
  const cancelOrder = async (order) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${order._id}`, { method: 'DELETE' });
      const data = await response.json();

      if (data.error) {
        console.error('Error deleting order:', data.error);
        setMessage('Failed to cancel order.');
        return;
      }

      // Restore inventory
      for (const item of order.items) {
        await fetch('http://localhost:5000/api/inventory/restore', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ item: item.name, quantity: item.quantity }),
        });
      }

      setMessage('Order canceled and inventory restored.');
    } catch (err) {
      console.error('Error canceling order:', err);
      setMessage('Failed to cancel order.');
    }
  };

  // Mark order as completed
  const handleCompleteOrder = (order) => {
    setSelectedOrder(order); // Open payment modal
  };

  const submitPayment = async () => {
    if (!paymentDetails.method || !paymentDetails.paidTo) {
      alert('Please fill in all payment details.');
      return;
    }

    try {
      await fetch(`http://localhost:5000/api/orders/${selectedOrder._id}/complete`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentDetails),
      });
      setMessage('Order marked as completed with payment details.');
      setSelectedOrder(null); // Close modal
      setPaymentDetails({ method: '', paidTo: '' });
    } catch (err) {
      console.error('Error completing order:', err);
      setMessage('Failed to complete order.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">🍷 Inventory Management</h2>

        {/* Add New Item */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Item Name"
            value={newItem.item}
            onChange={(e) => setNewItem({ ...newItem, item: e.target.value })}
            className="border p-2 mr-2 rounded"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 0 })}
            className="border p-2 mr-2 rounded"
          />
          <button
            onClick={handleAddItem}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Item
          </button>
        </div>

        {/* Inventory List */}
        <h3 className="text-2xl font-bold">📦 Inventory</h3>
        <ul>
          {inventoryItems.map((item) => (
            <li key={item._id} className="flex justify-between py-2 border-b">
              <span>{item.item}</span>
              <span>{item.quantity} units</span>
            </li>
          ))}
        </ul>

        {/* Orders List */}
        <h3 className="text-2xl font-bold mt-8">📝 Orders</h3>
        <ul>
          {orders.map((order) => (
            <li key={order._id} className="border-b py-4">
              <p>Customer: {order.customerName}</p>
              <p>Phone: {order.customerPhone}</p>
              <p>Address: {order.customerAddress}</p>
              <p>Total: ₪{order.totalPrice}</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => cancelOrder(order)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Cancel Order
                </button>
                <button
                  onClick={() => handleCompleteOrder(order)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Complete Order
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Payment Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Payment Details</h3>
              <input
                type="text"
                placeholder="Payment Method (Cash, Bit, PayBox)"
                value={paymentDetails.method}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, method: e.target.value })}
                className="border p-2 mb-4 w-full rounded"
              />
              <input
                type="text"
                placeholder="Paid To"
                value={paymentDetails.paidTo}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, paidTo: e.target.value })}
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
