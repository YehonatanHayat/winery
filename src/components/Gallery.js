// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Gallery = () => {
//   const [images, setImages] = useState([]);
//   const [newImage, setNewImage] = useState('');
//   const navigate = useNavigate();
//   const userRole = localStorage.getItem('userRole'); // בדיקת התפקיד

//   // הבאת התמונות מהשרת
//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const res = await fetch('http://localhost:5000/api/gallery');
//         const data = await res.json();
//         setImages(data.images);
//       } catch (err) {
//         console.error('Failed to fetch images:', err);
//       }
//     };
//     fetchImages();
//   }, []);

//   // הוספת תמונה - רק למנהל
//   const handleAddImage = async () => {
//     if (!newImage.trim()) return alert('Please enter a valid image URL.');
//     try {
//       const res = await fetch('http://localhost:5000/api/gallery', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`, // שולח את ה-Token
//         },
//         body: JSON.stringify({ url: newImage }),
//       });
//       const data = await res.json();
//       setImages([...images, data.image]);
//       setNewImage('');
//     } catch (err) {
//       console.error('Failed to add image:', err);
//     }
//   };

//   // מחיקת תמונה - רק למנהל
//   const handleRemoveImage = async (index) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/gallery/${index}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       if (res.ok) {
//         const updatedImages = images.filter((_, i) => i !== index);
//         setImages(updatedImages);
//       }
//     } catch (err) {
//       console.error('Failed to remove image:', err);
//     }
//   };

//   return (
//     <div className="min-h-screen p-8 bg-gray-50">
//       <h1 className="text-3xl font-bold text-center mb-6">📸 Gallery</h1>
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
//         {/* רק למנהל - הוספת תמונות */}
//         {userRole === 'admin' && (
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold mb-2">Add New Image</h2>
//             <input
//               type="text"
//               placeholder="Image URL"
//               value={newImage}
//               onChange={(e) => setNewImage(e.target.value)}
//               className="w-full p-2 border rounded mb-2"
//             />
//             <button
//               onClick={handleAddImage}
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//               Add Image
//             </button>
//           </div>
//         )}

//         {/* תצוגת התמונות */}
//         <div className="grid grid-cols-2 gap-4">
//           {images.map((image, index) => (
//             <div key={index} className="relative group">
//               <img src={image} alt={`Gallery ${index}`} className="w-full h-40 object-cover rounded" />
//               {/* רק למנהל - מחיקת תמונה */}
//               {userRole === 'admin' && (
//                 <button
//                   onClick={() => handleRemoveImage(index)}
//                   className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
//                 >
//                   Remove
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>

//         <button
//           onClick={() => navigate('/')}
//           className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//         >
//           Back to Home
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Gallery;
