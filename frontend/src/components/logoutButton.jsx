import React, { useContext } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

function Logoutbtn() {
  const navigate = useNavigate();
  const { getLoggedIn } = useContext(AuthContext);
  async function logout(e) {
    e.preventDefault();
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
      alert('See you :)');
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <button className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700" onClick={logout}>
      Log Out?
    </button>
  );
}

export default Logoutbtn;
