import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';
import Home from './pages/Home';

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

          <Route path="/product/:_id" element={<ProductDetails />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/address" element={<AddressPage />} />
          <Route path="/address/edit/:_id" element={<EditAdress />} />
          <Route path="/address/delete/:_id" element={<DeleteAddress />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/invoice" element={<InvoicePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
