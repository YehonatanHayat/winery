
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';
// import { motion } from 'framer-motion';
// import '../CSS/Info.css';
// import API_BASE_URL from '../config';

// const Info = () => {
//   const navigate = useNavigate();
//   const [role, setRole] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [wines, setWines] = useState([]);
//   const [editedWines, setEditedWines] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         setRole(decoded.role);
//       } catch (err) {
//         console.error('Invalid token:', err);
//         setRole(null);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     const fetchWines = async () => {
//       try {
//         const response = await fetch(`${API_BASE_URL}/api/info`);
//         if (!response.ok) throw new Error('Failed to fetch wine data');
//         const data = await response.json();
//         setWines(data);
//         setEditedWines(data);
//       } catch (err) {
//         console.error('Error fetching wine data:', err);
//       }
//     };

//     fetchWines();
//   }, []);

//   const handleEditClick = () => setIsEditing(true);

//   const handleSave = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${API_BASE_URL}/api/info/update`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ wines: editedWines }),
//       });

//       if (!response.ok) throw new Error('Failed to save changes.');

//       alert('Changes saved successfully!');
//       setWines(editedWines);
//       setIsEditing(false);
//     } catch (err) {
//       console.error('Error saving changes:', err);
//       alert('Failed to save changes.');
//     }
//   };

//   const handleInputChange = (index, field, value) => {
//     const updatedWines = [...editedWines];
//     updatedWines[index][field] = value;
//     setEditedWines(updatedWines);
//   };

//   return (
//     <div className="info-page">
//       <div className="info-page-container">
//         <motion.h1 className="info-page-title" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
//           Discover Our Exquisite Wines
//         </motion.h1>
//         <p className="info-page-description">
//           Explore our finest selection of wines, crafted with passion and precision.
//         </p>

//         <div className="info-page-grid">
//           {wines.map((wine, index) => (
//             <motion.div key={index} className="info-page-wine-card" whileHover={{ scale: 1.05 }}>
//               <img src={`${process.env.PUBLIC_URL}/${wine.image}`} alt={wine.name} className="info-page-wine-image" />
//               {isEditing ? (
//                 <div>
//                   <input type="text" value={editedWines[index]?.name || ''} onChange={(e) => handleInputChange(index, 'name', e.target.value)} className="info-page-input" />
//                   <textarea value={editedWines[index]?.description || ''} onChange={(e) => handleInputChange(index, 'description', e.target.value)} className="info-page-input" />
//                   <input type="number" value={editedWines[index]?.price || ''} onChange={(e) => handleInputChange(index, 'price', e.target.value)} className="info-page-input" />
//                 </div>
//               ) : (
//                 <div className="info-page-wine-content">
//                   <h2>{wine.name}</h2>
//                   <p>{wine.description}</p>
//                   <p className="info-page-price">₪{wine.price}</p>
//                 </div>
//               )}
//             </motion.div>
//           ))}
//         </div>

//         {role === 'admin' && (
//           <div>
//             <button onClick={isEditing ? handleSave : handleEditClick} className={`info-page-button ${isEditing ? 'info-page-button-save' : 'info-page-button-edit'}`}>
//               {isEditing ? 'Save Changes' : 'Edit Info'}
//             </button>
//           </div>
//         )}

//         <div className="info-page-button-container">
//           <button onClick={() => navigate('/orders')} className="info-page-button info-page-button-order">
//             Place an Order
//           </button>
//           <button onClick={() => navigate('/')} className="info-page-button info-page-button-home">
//             Home Page
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Info;



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { motion } from 'framer-motion';
import '../CSS/Info.css';
import API_BASE_URL from '../config';

const Info = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [wines, setWines] = useState([]);
  const [editedWines, setEditedWines] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
      } catch (err) {
        console.error('Invalid token:', err);
        setRole(null);
      }
    }
  }, []);

  useEffect(() => {
    const fetchWines = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/info`);
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

  const handleEditClick = () => setIsEditing(true);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/info/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ wines: editedWines }),
      });

      if (!response.ok) throw new Error('Failed to save changes.');

      alert('השינויים נשמרו בהצלחה!');
      setWines(editedWines);
      setIsEditing(false);
    } catch (err) {
      console.error('Error saving changes:', err);
      alert('לא הצלחנו לשמור את השינויים.');
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedWines = [...editedWines];
    updatedWines[index][field] = value;
    setEditedWines(updatedWines);
  };

  return (
    <div className="info-page" dir="rtl">
      <div className="info-page-container">
        <motion.h1 className="info-page-title" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          גלו את היינות המובחרים שלנו
        </motion.h1>


        <div className="info-page-grid">
          {wines.map((wine, index) => (
            <motion.div key={index} className="info-page-wine-card" whileHover={{ scale: 1.05 }}>
              <img src={`${process.env.PUBLIC_URL}/${wine.image}`} alt={wine.name} className="info-page-wine-image" />
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    value={editedWines[index]?.name || ''}
                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                    className="info-page-input"
                  />
                  <textarea
                    value={editedWines[index]?.description || ''}
                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                    className="info-page-input"
                  />
                  <input
                    type="number"
                    value={editedWines[index]?.price || ''}
                    onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                    className="info-page-input"
                  />
                </div>
              ) : (
                <div className="info-page-wine-content">
                  <h2>{wine.name}</h2>
                  <p>{wine.description}</p>
                  <p className="info-page-price">₪{wine.price}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {role === 'admin' && (
          <div>
            <button onClick={isEditing ? handleSave : handleEditClick} className={`info-page-button ${isEditing ? 'info-page-button-save' : 'info-page-button-edit'}`}>
              {isEditing ? 'שמור שינויים' : 'ערוך מידע'}
            </button>
          </div>
        )}

        <div className="info-page-button-container">
          <button onClick={() => navigate('/orders')} className="info-page-button info-page-button-order">
            בצע הזמנה
          </button>
          <button onClick={() => navigate('/')} className="info-page-button info-page-button-home">
            דף הבית
          </button>
        </div>
      </div>
    </div>
  );
};

export default Info;
