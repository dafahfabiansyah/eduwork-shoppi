import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const GetProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from your server when the component mounts
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/product');
        if (response.ok) {
          const productsData = await response.json();
          setProducts(productsData);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mt-5 text-blue-500 mb-5">Admin Products</h1>
      <Link to="/admin/add" className="bg-green-500 text-white py-2 px-4 rounded-md">
        Add Product
      </Link>

      <table className="w-[80%] mx-auto mt-5 ">
        <thead>
          <tr>
            <th>Image</th>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Tag</th>
            <th>Created at</th>
            <th>Last update</th>
            <th>Action</th>
            {/* Add more headers as needed */}
          </tr>
        </thead>
        <tbody className="border border-blue-300">
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border border-blue-300">
                <img
                  src={`http://localhost:5000/${product.image_url}`} // Assuming the server provides the correct image URL
                  alt={product.name}
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
              </td>
              <td className="px-2 border border-blue-300">{product._id}</td>
              <td className="px-2 border border-blue-300">{product.name}</td>
              <td className="px-2 border border-blue-300">{product.price}</td>
              <td className="px-2 border border-blue-300">{product.description}</td>
              {/* <td>{product.category.name}</td> */}
              <td className="px-3 border border-blue-300">{product.category && product.category.name ? product.category.name : 'none'}</td>
              <td className="px-3 border border-blue-300">{product.tag && product.tag.name ? product.tag.name : 'none'}</td>
              <td className="px-3 border border-blue-300">{product.createdAt}</td>
              <td className="px-3 border border-blue-300">{product.updatedAt}</td>
              <td>
                {' '}
                <Link to={`/admin/edit/${product._id}`} className="text-blue-500">
                  Edit
                </Link>
              </td>
              <td>
                {' '}
                <Link to={`/admin/delete/${product._id}`} className="text-red-500">
                  Delete
                </Link>
              </td>
              {/* Add more cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetProduct;
