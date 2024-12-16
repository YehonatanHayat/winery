import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const navigate = useNavigate(); // הוספת הניווט לדף אחר
  const [quantities, setQuantities] = useState({
    Asfar: 0,
    Kanob: 0,
    Herodion: 0,
  });

  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const [message, setMessage] = useState(''); // להודעות מהשרת

  const prices = {
    Asfar: 50,
    Kanob: 60,
    Herodion: 70,
  };

  // עדכון כמויות
  const handleChange = (e, wine) => {
    setQuantities({ ...quantities, [wine]: parseInt(e.target.value) || 0 });
  };

  // עדכון פרטי הלקוח
  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };

  // חישוב סה"כ מחיר
  const totalPrice = Object.keys(quantities).reduce(
    (sum, wine) => sum + quantities[wine] * prices[wine],
    0
  );

  // שליחת ההזמנה לשרת
  const handleOrder = async () => {
    const { name, phone, address } = customerDetails;

    // בדיקת תקינות - שדות חובה
    if (!name || !phone || !address) {
      alert('Please fill in all the required fields: Name, Phone, and Address.');
      return;
    }

const wines = Object.keys(quantities)
  .filter((wine) => quantities[wine] > 0)
  .map((wine) => ({
    name: wine,
    quantity: quantities[wine],
    price: prices[wine], // הוספת המחיר מהמילון prices
  }));


    if (wines.length === 0) {
      alert('Please select at least one wine to order.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wines, totalPrice, customerDetails }),
      });

      const data = await response.json();
      setMessage(data.message); // הצגת הודעת אישור
    } catch (err) {
      console.error('Error:', err);
      setMessage('Failed to place the order. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Place Your Order</h2>

        {/* תצוגת יינות */}
        <div className="space-y-4">
          {Object.keys(quantities).map((wine) => (
            <div key={wine} className="flex justify-between items-center">
              <span className="text-lg font-medium">{wine}</span>
              <span className="text-gray-700">${prices[wine]} per bottle</span>
              <input
                type="number"
                min="0"
                value={quantities[wine]}
                onChange={(e) => handleChange(e, wine)}
                className="w-20 px-2 py-1 border rounded"
              />
            </div>
          ))}
        </div>

        {/* שדות פרטי לקוח */}
        <div className="mt-6 space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={customerDetails.name}
            onChange={handleDetailsChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone Number"
            value={customerDetails.phone}
            onChange={handleDetailsChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Your Address"
            value={customerDetails.address}
            onChange={handleDetailsChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        {/* חישוב סה"כ */}
        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold">Total Price</h3>
          <p className="text-2xl font-bold text-green-600">${totalPrice}</p>
        </div>

        {/* כפתור הזמנה */}
        <button
          onClick={handleOrder}
          className="mt-4 w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Place Order
        </button>

        {/* כפתור חזרה לדף Info */}
        <button
          onClick={() => navigate('/info')} // ניווט לדף Info
          className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Back to Homepage
        </button>

        {/* הודעות */}
        {message && (
          <div className="mt-4 text-center text-green-600 font-medium">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
