import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { FaEyeSlash } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';

const FormLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { getLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loginData = { email, password };
      const response = await axios.post('http://localhost:5000/api/auth/login', loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (response.data) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.id);
        localStorage.setItem('username', response.data.name);

        enqueueSnackbar('Login Berhasil', { variant: 'success' });
        await getLoggedIn();
        navigate('/');
        console.log(response.data);
      } else {
        console.error('Respon server tidak sesuai format yang diharapkan.');
        enqueueSnackbar('Terjadi kesalahan saat login', {
          variant: 'error',
        });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.response?.data?.message || 'Terjadi kesalahan saat login', { variant: 'error' });
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="email">Email</label>
      <input
        className="text-sm border border-orange-500 rounded mb-5 w-full py-2 px-3 text-slate-700 placeholder: text-black"
        label="Email"
        type="email"
        placeholder="example@gmail.com"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <div className="relative">
        <input
          className="text-sm border border-orange-500 rounded mb-5 w-full py-2 px-3 text-slate-700 placeholder: text-black"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="*********"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Password visibility toggle button */}
        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 py-2 px-3 px-2 text-sm">
          {showPassword ? <FaEyeSlash /> : <IoEyeSharp />}
        </button>
      </div>
      <button className="bg-orange-500 w-full text-white h-12 rounded-md" type="submit">
        Login
      </button>
    </form>
  );
};

export default FormLogin;
