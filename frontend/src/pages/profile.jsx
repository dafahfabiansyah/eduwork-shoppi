import React, { useState, useEffect, useContext } from 'react';
import Logoutbtn from '../components/logoutButton';
import Header from '../fragment/Header';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, total } = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth', {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        console.log('API Response:', response.data);

        if (response.data && typeof response.data === 'object' && response.data.verified && response.data.verified.User) {
          setUserData(response.data.verified.User);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <section className="bg-orange-200 h-screen flex items-center justify-center">
        <div className="bg-white h-full w-[60%] mx-auto border rounded-lg flex flex-col relative">
          <div className="flex flex-col items-center justify-center h-full">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {userData && (
              <>
                <h1 className="text-2xl mb-3 font-bold">Welcome, {userData.name}!</h1>
                <p>{userData.email}</p>
              </>
            )}
            <div className="mt-3">
              <h2 className="text-xl font-bold mb-3">Purchase History:</h2>
              {cart.length === 0 ? (
                <p>No purchases yet.</p>
              ) : (
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Quantity
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Total Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.name}</td>
                          <td className="px-6 py-4">{item.amount}</td>
                          <td className="px-6 py-4">Rp. {item.price * item.amount}</td>
                          <td className="px-6 py-4">waiting payment</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {/* {cart.length > 0 && (
                <>
                  <p className="mt-3">Total Spent: Rp. {total}</p>
                  <p className="mt-3">status: waiting payment</p>
                </>
              )} */}
              <div className="mt-3 flex justify-between">
                <Link to="/invoice">
                  <button className="mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">Go to Invoice</button>
                </Link>
                <Logoutbtn />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
