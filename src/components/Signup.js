import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';
import '../CSS/Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    day: '1',
    month: 'January',
    year: '2024',
    gender: '',
    email: '',
    password: '',
    role: 'customer'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
        alert('המשתמש נרשם בהצלחה!');
        navigate('/login');
      } else {
        alert('הרישום נכשל. אנא נסה שוב.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="signup-page" dir="rtl">
      <div className="signup-container">
        <h2 className="signup-title">צור חשבון חדש</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* שם פרטי ושם משפחה */}
          <div className="flex space-x-4">
            <input
              type="text"
              name="firstName"
              placeholder="שם פרטי"
              className="w-full px-4 py-2 border rounded-lg"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="שם משפחה"
              className="w-full px-4 py-2 border rounded-lg"
              onChange={handleChange}
              required
            />
          </div>

          {/* תאריך לידה */}
          <div>
            <label className="gender-and-date-line">תאריך לידה:</label>
            <div className="flex space-x-2">
            <select
                name="year"
                className="w-full px-2 py-2 border rounded-lg"
                onChange={handleChange}
                value={formData.year}
              >
                {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            
              <select
                name="month"
                className="w-full px-2 py-2 border rounded-lg"
                onChange={handleChange}
                value={formData.month}
              >
                {['ינואר', 'פברואר', 'מרץ', 'אפריל ', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'].map(
                  (month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  )
                )}
              </select>
              <select
                name="day"
                className="w-full px-2 py-2 border rounded-lg"
                onChange={handleChange}
                value={formData.day}
              >
                {[...Array(31)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

            </div>
          </div>

          {/* מין */}
          <div className="gender-container">
            <label className="gender-and-date-line">מין:</label>
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={handleChange}
                />{' '}
                זכר
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleChange}
                />{' '}
                נקבה
              </label>
            </div>
          </div>

          {/* אימייל וסיסמה */}
          <input
            type="email"
            name="email"
            placeholder="כתובת אימייל"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="סיסמה"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
            required
          />

          {/* כפתור רישום */}
          <button
            type="submit"
            className="signup-button"
          >
            הירשם
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          כבר יש לך חשבון?{' '}
          <a href="/login" className="text-green-500 hover:underline">
            התחבר
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
