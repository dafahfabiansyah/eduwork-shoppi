import React, { useContext, useEffect, useState } from 'react';

import AddressCard from './address/addressCard';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import Header from '../fragment/Header';

const CheckoutPage = () => {
  const [address, setAddress] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        console.log(userId);

        const response = await axios.get(`http://localhost:5000/api/address/user/${userId}`);

        setAddress(response.data);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };
    fetchData();
  }, []);

  const { cart, total, itemAmount } = useContext(CartContext);

  return (
    <>
      {/* <Header /> */}
      <section className="bg-orange-50">
        <div className="shadow shadow-2xl flex items-center">
          <div className="w-[80%] mt-[40px] bg-white mx-auto border rounded-lg p-8">
            <AddressCard address={address} />

            <div className="h-[500px] w-[90%] border-b mx-auto mt-5">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Cart Items */}
                <div className="mb-5">
                  {cart.map((item) => (
                    <div key={item._id} className="flex justify-between items-center mb-5">
                      <div className="flex items-center">
                        <img className="w-16 h-16 object-cover rounded-full" src={`http://localhost:5000/${item.image_url}`} />
                        <div className="ml-5">
                          <h3 className="text-lg font-medium">{item.name}</h3>
                          <p className="text-gray-600 text-sm">Jumlah : {item.amount}</p>
                          <p className="text-gray-600 text-sm">Rp. {item.price * item.amount}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <span className="grid grid-cols-3 gap-4 text-xl mb-2 w-full h-[70px] items-center">
                  <span className="text-xl font-semibold mb-3">Sub Total</span>
                  <span>:</span>
                  <span className="flex justify-between text-2xl">
                    <p>Rp. {total}</p>
                  </span>
                  <span className="text-2xl font-semibold mb-3">Jumlah</span>
                  <span>:</span>
                  <span className="flex justify-between text-xl">
                    <p>{itemAmount}</p>
                  </span>
                  <span className="text-2xl font-semibold mb-3">Biaya Ongkir</span>
                  <span>:</span>
                  <span className="flex justify-between text-xl">
                    <p className="text-red-500">Free</p>
                  </span>
                  <span className="text-2xl font-semibold mb-3">Biaya Admin</span>
                  <span>:</span>
                  <span className="flex justify-between text-xl">
                    <p className="text-red-500">Free</p>
                  </span>
                  <span className="text-2xl font-semibold mb-3">Total</span>
                  <span>:</span>
                  <span className="flex justify-between text-xl">
                    <p>Rp. {total}</p>
                  </span>
                </span>
              </div>
            </div>
            <Link to="/invoice">
              <div className="w-full flex justify-end">
                <button className="bg-blue-600 rounded-lg text-xl mx-[60px] mt-3 hover:bg-blue-900 transition-all px-5 flex py-3 px-3 text-white">Check Out</button>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutPage;
