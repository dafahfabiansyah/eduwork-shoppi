import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddProduct = () => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    tag: '',
  });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const form = new FormData();
      form.append('image_url', file);
      form.append('name', formData.name);
      form.append('price', formData.price);
      form.append('description', formData.description);
      form.append('category', formData.category);
      form.append('tag', formData.tag);

      const response = await fetch('http://localhost:5000/api/product', {
        method: 'POST',
        body: form,
        credentials: 'same-origin', // or 'include' depending on your CORS and authentication setup
      });

      if (response.ok) {
        console.log('File uploaded successfully');
      } else {
        console.error('File upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <section className="shadow shadow-2xl  min-h-screen flex">
      <Link to="/admin" className="text-blue-500 mb-3 block">
        Back to Admin
      </Link>
      <div className="w-[40%] mx-auto border rounded-lg items-center">
        <h1 className="text-center text-2xl font-bold mt-5 text-blue-500 mb-5">Add Product Form</h1>
        <form className="w-[80%] mx-auto mt-5 mb-8">
          <label className="block">Name</label>
          <input type="text" placeholder="Enter name" name="name" className="text-sm border rounded w-full py-2 px-3 text-slate-800 placeholder-opacity-50" value={formData.name} onChange={handleInputChange} />
          <label className="block mt-3">Price</label>
          <input type="text" placeholder="Enter price" name="price" className="text-sm border rounded w-full py-2 px-3 text-slate-800 placeholder-opacity-50" value={formData.price} onChange={handleInputChange} />
          <label className="block mt-3">Description</label>
          <textarea placeholder="Enter description" name="description" className="text-sm border rounded w-full py-2 px-3 text-slate-800 h-[100px] placeholder-opacity-50" value={formData.description} onChange={handleInputChange} />
          <label className="block mt-3">Category</label>
          <input type="text" placeholder="Enter category" name="category" className="text-sm border rounded w-full py-2 px-3 text-slate-800 placeholder-opacity-50" value={formData.category} onChange={handleInputChange} />
          <label className="block mt-3">Tag</label>
          <input type="text" placeholder="Enter tag" name="tag" className="text-sm border rounded w-full py-2 px-3 text-slate-800 placeholder-opacity-50" value={formData.tag} onChange={handleInputChange} />
          <label className="block mt-3">Image</label>
          <input type="file" onChange={handleFileChange} />
          <button className="bg-blue-500 w-full text-white h-12 rounded-md mt-5" onClick={handleSubmit}>
            Save
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;
