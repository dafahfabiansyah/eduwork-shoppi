import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const DeleteProduct = () => {
  const { _id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product details for the specified ID when the component mounts
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/product/${_id}`);
        if (response.ok) {
          const productData = await response.json();
          setProduct(productData);
        } else {
          console.error('Failed to fetch product details');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [_id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/product/${_id}`, {
        method: 'DELETE',
        credentials: 'same-origin',
      });

      if (response.ok) {
        console.log('Product deleted successfully');
        // Redirect to the product list or perform other actions
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mt-5 text-red-500 mb-5">Delete Product</h1>
      {product && (
        <div>
          <p>Are you sure you want to delete the product "{product.name}"?</p>
          <button className="bg-red-500 text-white py-2 px-4 rounded-md" onClick={handleDelete}>
            Yes, Delete
          </button>
          <Link to="/admin" className="text-blue-500 ml-2">
            Cancel
          </Link>
        </div>
      )}
    </div>
  );
};

export default DeleteProduct;
