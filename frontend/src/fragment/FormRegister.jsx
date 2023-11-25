import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { FaEyeSlash } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';

const FormRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPasword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  async function register(e) {
    e.preventDefault();
    try {
      const registerData = { name, email, password };
      const res = await axios.post('http://localhost:5000/api/auth/register', registerData);
      console.log(res.data);
      enqueueSnackbar('Register Berhasil', { variant: 'success' });

      navigate('/login');
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    }
  }

  return (
    <form onSubmit={register}>
      <label>Username</label>
      <input
        className="text-sm border  border-orange-500 rounded w-full mb-5 py-2 px-3 text-slate-700 placeholder: text-black"
        label="Username"
        type="text"
        placeholder="Insert Username"
        name="username"
        onChange={(e) => setName(e.target.value)}
      />
      <label>Email</label>
      <input
        className="text-sm border border-orange-500 rounded mb-5 w-full py-2 px-3 text-slate-700 placeholder: text-black"
        label="Email"
        type="email"
        placeholder="example@gmail.com"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password</label>
      <div className="relative">
        <input
          className="text-sm border rounded border-orange-500 mb-5 w-full py-2 px-3 text-slate-700 placeholder: text-black"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="*********"
          name="password"
          onChange={(e) => setPasword(e.target.value)}
        />
        {/* Password visibility toggle button */}
        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 py-2 px-3 px-2 text-sm">
          {showPassword ? <FaEyeSlash /> : <IoEyeSharp />}
        </button>
      </div>

      <button className="bg-orange-500 w-full text-white h-12 rounded-md">Register</button>
    </form>
  );
};

export default FormRegister;
