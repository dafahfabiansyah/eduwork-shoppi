import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';
import Home from './pages/Home';

import AddProduct from './pages/admin/addProduct';
import GetProduct from './pages/admin/getProduct';
import EditProduct from './pages/admin/editProduct';
import DeleteProduct from './pages/admin/deleteProduct';

import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import NotFound from './pages/NotFound';
import AddressPage from './pages/address/AddAddres';

import InvoicePage from './pages/Invoice';
import CheckoutPage from './pages/Checkout';
import ProfilePage from './pages/profile';

import CartPage from './pages/cart';
import DeleteAddress from './pages/address/deleteAddress';
import EditAdress from './pages/address/EditAdress';

const App = () => {
  return (
    <div className="overflow-hidden">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />

          {/* admin */}
          <Route path="/admin" element={<GetProduct />} />
          <Route path="/admin/add" element={<AddProduct />} />
          <Route path="/admin/edit/:_id" element={<EditProduct />} />
          <Route path="/admin/delete/:_id" element={<DeleteProduct />} />

          {/* authentication */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* address */}
          <Route path="/address" element={<AddressPage />} />
          <Route path="/address/edit/:_id" element={<EditAdress />} />
          <Route path="/address/delete/:_id" element={<DeleteAddress />} />
          {/* payment */}
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/invoice" element={<InvoicePage />} />

          {/* product */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:_id" element={<ProductDetails />} />

          {/* profile */}
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
