
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Orders.css';
import API_BASE_URL from '../config';
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
        const response = await fetch(`${API_BASE_URL}/api/info`);
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
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
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
    <div className="orders-page">
      <div className="orders-container">
        <h2 className="orders-title">Place Your Order</h2>

        {/* תצוגת יינות */}
        <div className="wines-list">
          {Object.keys(prices).map((wine) => (
            <div key={wine} className="wine-item">
              <span className="wine-name">{wine}</span>
              <span className="wine-price">₪{prices[wine]} per bottle</span>
              <input
                type="number"
                min="0"
                value={quantities[wine] || 0}
                onChange={(e) => handleChange(e, wine)}
                className="wine-quantity"
              />
            </div>
          ))}
        </div>

        {/* שדות פרטי לקוח */}
        <div className="customer-details">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={customerDetails.name}
            onChange={handleDetailsChange}
            className="input-field"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone Number"
            value={customerDetails.phone}
            onChange={handleDetailsChange}
            className="input-field"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Your Address"
            value={customerDetails.address}
            onChange={handleDetailsChange}
            className="input-field"
            required
          />
        </div>

        <div className="total-price">
          <h3>Total Price</h3>
          <p>₪{totalPrice}</p>
        </div>

        <button onClick={handleOrder} className="button button-order">
          Place Order
        </button>

        <button onClick={() => navigate('/info')} className="button button-back">
          Back to Homepage
        </button>

        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default Orders;
