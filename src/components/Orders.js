


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});
  const [prices, setPrices] = useState({}); // מחירים מהשרת
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // שליפת מחירי היינות מהשרת
    const fetchPrices = async () => {
      try {
        const response = await fetch('https://wineryserver.onrender.com/api/info');
        const data = await response.json();

        // יצירת מבנה המחירים
        const fetchedPrices = {};
        data.forEach((wine) => {
          fetchedPrices[wine.name] = wine.price;
        });

        setPrices(fetchedPrices);

        // אתחול כמויות
        const initialQuantities = {};
        Object.keys(fetchedPrices).forEach((wine) => {
          initialQuantities[wine] = 0;
        });

        setQuantities(initialQuantities);
        console.log('✅ Prices fetched:', fetchedPrices);
      } catch (err) {
        console.error('❌ Error fetching prices:', err);
        setError('Failed to load wine prices.');
      }
    };

    fetchPrices();
  }, []);

  const handleChange = (e, wine) => {
    setQuantities({ ...quantities, [wine]: parseInt(e.target.value) || 0 });
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };

  const totalPrice = Object.keys(quantities).reduce(
    (sum, wine) => sum + quantities[wine] * (prices[wine] || 0),
    0
  );

  const handleOrder = async () => {
    const { name, phone, address } = customerDetails;

    if (!name || !phone || !address) {
      alert('Please fill in all the required fields: Name, Phone, and Address.');
      return;
    }

    const wines = Object.keys(quantities)
      .filter((wine) => quantities[wine] > 0)
      .map((wine) => ({
        name: wine,
        quantity: quantities[wine],
        price: prices[wine],
      }));

    if (wines.length === 0) {
      alert('Please select at least one wine to order.');
      return;
    }

    try {
      const response = await fetch('https://wineryserver.onrender.com/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wines, totalPrice, customerDetails }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setError('');
        setQuantities({});
        setCustomerDetails({ name: '', phone: '', address: '' });
        console.log('✅ Order placed successfully:', data.order);
      } else {
        setError(data.error);
        setMessage('');
      }
    } catch (err) {
      console.error('❌ Error placing order:', err);
      setError('Failed to place the order. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Place Your Order</h2>

        {/* תצוגת יינות */}
        <div className="space-y-4">
          {Object.keys(prices).map((wine) => (
            <div key={wine} className="flex justify-between items-center">
              <span className="text-lg font-medium">{wine}</span>
              <span className="text-gray-700">${prices[wine]} per bottle</span>
              <input
                type="number"
                min="0"
                value={quantities[wine] || 0}
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

        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold">Total Price</h3>
          <p className="text-2xl font-bold text-green-600">${totalPrice}</p>
        </div>

        <button
          onClick={handleOrder}
          className="mt-4 w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Place Order
        </button>

        <button
          onClick={() => navigate('/info')}
          className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Back to Homepage
        </button>

        {message && (
          <div className="mt-4 text-center text-green-600 font-medium">{message}</div>
        )}
        {error && (
          <div className="mt-4 text-center text-red-600 font-medium">{error}</div>
        )}
      </div>
    </div>
  );
};

export default Orders;
