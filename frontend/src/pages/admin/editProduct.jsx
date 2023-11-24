import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditProduct = () => {
  //   const productId = match.params.id;
  const { _id } = useParams();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    tag: '',
    imageUrl: '',
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    // Fetch the product data for the specified ID when the component mounts
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/product/${_id}`);
        if (response.ok) {
          const productData = await response.json();
          setProduct(productData);
        } else {
          console.error('Failed to fetch product');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [_id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const form = new FormData();
      form.append('name', product.name);
      form.append('price', product.price);
      form.append('description', product.description);
      form.append('category', product.category);
      form.append('tag', product.tag);
      if (file) {
        form.append('image_url', file);
      }

      const response = await fetch(`http://localhost:5000/api/product/${_id}`, {
        method: 'PUT',
        credentials: 'same-origin',
        body: form,
      });

      if (response.ok) {
        console.log('Product updated successfully');
        // Redirect or perform other actions
      } else {
        console.error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mt-5 text-blue-500 mb-5">Edit Product</h1>
      <form className="w-[80%] mx-auto mt-5 mb-8">
        <label className="block">Name</label>
        <input type="text" placeholder="Enter name" name="name" className="text-sm border rounded w-full py-2 px-3 text-slate-800 placeholder-opacity-50" value={product.name} onChange={handleInputChange} />
        <label className="block mt-3">Price</label>
        <input type="text" placeholder="Enter price" name="price" className="text-sm border rounded w-full py-2 px-3 text-slate-800 placeholder-opacity-50" value={product.price} onChange={handleInputChange} />
        <label className="block mt-3">Description</label>
        <textarea placeholder="Enter description" name="description" className="text-sm border rounded w-full py-2 px-3 text-slate-800 h-[100px] placeholder-opacity-50" value={product.description} onChange={handleInputChange} />
        <label className="block mt-3">Category</label>
        <input type="text" placeholder="Enter category" name="category" className="text-sm border rounded w-full py-2 px-3 text-slate-800 placeholder-opacity-50" value={product.category} onChange={handleInputChange} />
        <label className="block mt-3">Tag</label>
        <input type="text" placeholder="Enter tag" name="tag" className="text-sm border rounded w-full py-2 px-3 text-slate-800 placeholder-opacity-50" value={product.tag} onChange={handleInputChange} />

        <label className="block mt-3">Image</label>
        <input type="file" onChange={handleFileChange} />
        <button className="bg-blue-500 w-full text-white h-12 rounded-md mt-5" onClick={handleSubmit}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
