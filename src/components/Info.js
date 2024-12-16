import React from 'react';
import { useNavigate } from 'react-router-dom'; // יבוא של useNavigate לניווט

const Info = () => {
  const navigate = useNavigate(); // פונקציה לנווט לדפים

  const wines = [
    {
      name: 'Arogot',
      description:
        'A new and unique blend combining 50% Cabernet Franc and 50% Cabernet Sauvignon. Aged in oak barrels for several months, full-bodied, unique aroma, and long finish.',
      price: 30,
      image: 'https://via.placeholder.com/150?text=Arogot+Wine',
    },
    {
      name: 'Kanob Ridge',
      description: '100% Cabernet Franc from a single vineyard. Aged in oak barrels.',
      price: 50,
      image: 'https://via.placeholder.com/150?text=Kanob+Ridge',
    },
    {
      name: 'Kedem',
      description: '100% Cabernet Sauvignon from a single vineyard. Aged in oak barrels.',
      price: 50,
      image: 'https://via.placeholder.com/150?text=Kedem+Wine',
    },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center p-8 relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1528825871115-3581a5387919')",
      }}
    >
      {/* כפתור מעבר ל-Login בצד ימין למעלה */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => navigate('/login')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
        >Login
        </button>
      </div>

      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-2xl bg-opacity-90">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 animate-bounce">
          Welcome to Our Winery
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Our vineyards are located 940 meters above sea level, on the eastern slopes of Gush Etzion,
          on the way to the Judean Desert.
        </p>

        {/* Wines List */}
        <div className="space-y-6">
          {wines.map((wine, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-100 rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300"
            >
              <img
                src={wine.image}
                alt={wine.name}
                className="w-32 h-32 object-cover rounded-lg mr-4"
              />
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">{wine.name}</h2>
                <p className="text-gray-600 mb-2">{wine.description}</p>
                <p className="text-lg font-bold text-green-600">Price: ₪{wine.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-700 mb-2 text-lg">
            For orders, contact <span className="font-bold">Yael Hayat</span> -{' '}
            <strong>054-4858509</strong>
          </p>
          <button
            onClick={() => navigate('/orders')} // ניווט לדף ההזמנות
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            or press here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Info;
