
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Info = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // מצב עריכה
  const [wines, setWines] = useState([]); // המידע יגיע מהשרת
  const [editedWines, setEditedWines] = useState([]);

  // פענוח ה-token ובדיקת ה-role
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
      } catch (err) {
        console.error('Invalid token:', err);
      }
    }

    // שליפת המידע מהשרת
    const fetchWines = async () => {
      try {
        const response = await fetch('https://wineryserver.onrender.com/api/info');
        if (!response.ok) throw new Error('Failed to fetch wine data');
        const data = await response.json();
        setWines(data);
        setEditedWines(data);
      } catch (err) {
        console.error('Error fetching wine data:', err);
      }
    };

    fetchWines();
  }, []);

  // התחלת עריכה
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // שמירת השינויים
  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('https://wineryserver.onrender.com/api/info/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ wines: editedWines }),
      });

      if (!response.ok) throw new Error('Failed to save changes.');

      alert('Changes saved successfully!');
      setWines(editedWines); // עדכון התצוגה
      setIsEditing(false);
    } catch (err) {
      console.error('Error saving changes:', err);
      alert('Failed to save changes.');
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedWines = [...editedWines];
    updatedWines[index][field] = value;
    setEditedWines(updatedWines);
  };

  return (
    
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-6">Welcome to Our Winery</h1>
        <p className="text-center text-gray-600 mb-8">
          Our vineyards are located 940 meters above sea level, on the eastern slopes of Gush Etzion.
        </p>

        {/* תצוגה או עריכה */}
        <div className="space-y-6">
          {wines.map((wine, index) => (
            <div key={index} className="bg-gray-200 p-4 rounded-lg shadow">
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    value={editedWines[index]?.name || ''}
                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <textarea
                    value={editedWines[index]?.description || ''}
                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <input
                    type="number"
                    value={editedWines[index]?.price || ''}
                    onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-semibold">{wine.name}</h2>
                  <p>{wine.description}</p>
                  <p className="font-bold text-green-600">₪{wine.price}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* כפתורי עריכה ושמירה */}
        {role === 'admin' && (
          <div className="mt-6 text-center">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={handleEditClick}
                className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                Edit Info
              </button>
            )}
          </div>
        )}

      {role != 'admin' && (
        <div className="mt-8 text-center">
        {/* כפתור ביצוע הזמנה */}
        <button
          onClick={() => navigate('/orders')}
          className="mr-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Place an Order
        </button>
          </div>
        )}
      </div>
    </div>
    
  );
};

export default Info;
