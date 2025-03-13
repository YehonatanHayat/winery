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
    const fetchPrices = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/info`);
        const data = await response.json();

        const fetchedPrices = {};
        data.forEach((wine) => {
          fetchedPrices[wine.name] = wine.price;
        });

        setPrices(fetchedPrices);
        const initialQuantities = {};
        Object.keys(fetchedPrices).forEach((wine) => {
          initialQuantities[wine] = 0;
        });

        setQuantities(initialQuantities);
        console.log('מחירים נשלפו:', fetchedPrices);
      } catch (err) {
        console.error('שגיאה בשליפת מחירים:', err);
        setError('לא הצלחנו לטעון את מחירי היינות.');
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
      alert('אנא מלא את כל השדות הנדרשים: שם, טלפון וכתובת.');
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
      alert('אנא בחר לפחות יין אחד להזמנה.');
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
        console.log('הזמנה בוצעה בהצלחה:', data.order);
      } else {
        setError(data.error);
        setMessage('');
      }
    } catch (err) {
      console.error('שגיאה בביצוע ההזמנה:', err);
      setError('לא הצלחנו לבצע את ההזמנה. אנא נסה שוב.');
      setMessage('');
    }
  };

  return (
    <div dir="rtl" className="orders-page">
      <div className="orders-container">
        <h2 className="orders-title">בצע את ההזמנה שלך</h2>

        {/* תצוגת יינות */}
        <div className="wines-list">
          {Object.keys(prices).map((wine) => (
            <div key={wine} className="wine-item">
              <span className="wine-name">{wine}</span>
              <span className="wine-price"> מחיר לבקבוק ₪ {prices[wine]}</span>
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
            placeholder="שם"
            value={customerDetails.name}
            onChange={handleDetailsChange}
            className="input-field"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="טלפון"
            value={customerDetails.phone}
            onChange={handleDetailsChange}
            className="input-field"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="כתובת"
            value={customerDetails.address}
            onChange={handleDetailsChange}
            className="input-field"
            required
          />
        </div>

        <div className="total-price">
          <h3>סה"כ מחיר</h3>
          <p>₪{totalPrice}</p>
        </div>
        <div className="buttons">
          <button onClick={handleOrder} className="button button-order">
            בצע הזמנה
          </button>

          <button onClick={() => navigate('/')} className="button button-back">
            חזרה לעמוד הבית
          </button>
        </div>
        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default Orders;
