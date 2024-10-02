// import React, { useEffect, useState } from 'react';
// import { Modal, Button } from 'react-bootstrap'; // Import Modal and Button from react-bootstrap
// import { useParams } from 'react-router-dom'; // To access URL parameters
// import Service from '../../Services/Service'; // Import the service
// import './ViewProductDetails.css' // Import custom CSS for styling
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function ViewProductDetails() {
//   const { id } = useParams(); // Get the product ID from the URL
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await Service.getProductById(id);
//         setProduct(response.data); // Set the fetched product data
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching product:', error);
//         toast.error('Failed to fetch product details. Please try again.');
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   if (loading) {
//     return <div className="text-center mt-5">Loading...</div>;
//   }

//   if (!product) {
//     return <div className="text-center mt-5">Product not found</div>;
//   }

//   return (
//     <>
//       <ToastContainer />
//       <div className="container mt-5">
//         <div className="product-details-card card p-4">
//           <div className="row">
//             <div className="col-md-6">
//               {/* <img
//                 src={product.imageUrl || 'https://via.placeholder.com/300'}
//                 alt={product.name}
//                 className="img-fluid product-image"
//               /> */}
//             </div>
//             <div className="col-md-6">
//               <h2>{product.name}</h2>
//               <p className="text-muted">Category: {product.category}</p>
//               <p className="text-muted">Vendor ID: {product.vendorId}</p>
//               <p className="text-success">Status: {product.status}</p>
//               <h4 className="text-primary">Price: ${product.price}</h4>
//               <p>{product.description}</p>
//               <p>Stock Quantity: {product.stockQuantity}</p>
//               <div className="ratings">
//                 <h6>Ratings:</h6>
//                 {product.ratings.length > 0 ? (
//                   product.ratings.map((rating, index) => (
//                     <div key={index} className="rating">
//                       <p>User: {rating.user}</p>
//                       <p>Score: {rating.score}/5</p>
//                       <p>Review: {rating.review}</p>
//                     </div>
//                   ))
//                 ) : (
//                   <p>No ratings available.</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ViewProductDetails;