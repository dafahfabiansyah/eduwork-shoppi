import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

function Logoutbtn() {
  const navigate = useNavigate();
  const { getLoggedIn } = useContext(AuthContext);
  const [isModalOpen, setModalOpen] = useState(false);

  async function logout() {
    try {
      await axios.get('http://localhost:5000/api/auth/logout', {
        withCredentials: true,
      });
      await getLoggedIn();
      localStorage.removeItem('cart');
      navigate('/login');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('name');
      // alert('See you :)');
    } catch (error) {
      console.error(error);
    }
  }

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeModal();
  };

  return (
    <div>
      <button className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700" onClick={openModal}>
        Log Out?
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md">
            <p>Are you sure you want to log out?</p>
            <div className="mt-4 flex justify-end">
              <button className="mr-2 px-4 py-2 text-white bg-red-500 rounded-md" onClick={handleLogout}>
                Logout
              </button>
              <button className="px-4 py-2 text-white bg-gray-500 rounded-md" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Logoutbtn;
