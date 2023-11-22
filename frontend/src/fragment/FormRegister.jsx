import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';

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
      <label>Fullname</label>
      <input
        className="text-sm border  border-blue-600 rounded w-full mb-5 py-2 px-3 text-slate-700 placeholder: text-black"
        label="Full Name"
        type="text"
        placeholder="Insert Your Name"
        name="fullname"
        onChange={(e) => setName(e.target.value)}
      />
      <label>Email</label>
      <input
        className="text-sm border border-blue-600 rounded mb-5 w-full py-2 px-3 text-slate-700 placeholder: text-black"
        label="Email"
        type="email"
        placeholder="example@gmail.com"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password</label>
      <div className="relative">
        <input
          className="text-sm border rounded border-blue-600 mb-5 w-full py-2 px-3 text-slate-700 placeholder: text-black"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="*********"
          name="password"
          onChange={(e) => setPasword(e.target.value)}
        />
        {/* Password visibility toggle button */}
        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 py-2 px-3 px-2 text-sm">
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>

      <button className="bg-blue-600 w-full text-white h-12 rounded-md">Register</button>
    </form>
  );
};

export default FormRegister;

// rencananya buat login with google
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useSnackbar } from 'notistack';
// // import { GoogleLogin } from '@react-oauth/google';
// import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

// const FormRegister = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPasword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const { enqueueSnackbar } = useSnackbar();
//   const responseGoogle = async (response) => {
//     try {
//       console.log('Google login response:', response);

//       if (response.profileObj) {
//         // Extract Google user data
//         const { name: googleName, email: googleEmail } = response.profileObj;

//         // Use the Google user data to register or log in as needed
//         const registerData = { name: googleName, email: googleEmail, password: 'googlePassword' }; // You might want to generate a random password for Google users
//         const res = await axios.post('http://localhost:5000/api/auth/register', registerData);
//         console.log(res.data);
//         enqueueSnackbar('Register Berhasil', { variant: 'success' });

//         navigate('/login');
//       } else {
//         // Handle the case when profileObj is undefined or not present
//         console.error('Google login response is missing profileObj:', response);
//         enqueueSnackbar('Google login failed. Please try again.', { variant: 'error' });
//       }
//     } catch (error) {
//       console.error(error);
//       enqueueSnackbar(error.response?.data?.message || 'An error occurred during registration.', { variant: 'error' });
//     }
//   };

//   const onFailureGoogle = (error) => {
//     console.error('Google login failed:', error);
//   };

//   async function register(e) {
//     e.preventDefault();
//     try {
//       const registerData = { name, email, password };
//       const res = await axios.post('http://localhost:5000/api/auth/register', registerData);
//       console.log(res.data);
//       enqueueSnackbar('Register Berhasil', { variant: 'success' });

//       navigate('/login');
//     } catch (error) {
//       console.error(error);
//       enqueueSnackbar(error.response.data.message, { variant: 'error' });
//     }
//   }

//   return (
//     <GoogleOAuthProvider clientId="62931102438-6u0inouulvu673sbrlnpghfirjd0vi0f.apps.googleusercontent.com" origin="http://localhost:5173">
//       <form onSubmit={register}>
//         <label>Username</label>
//         <input className="text-sm border rounded w-full mb-5 py-2 px-3 text-slate-700 placeholder: opacity-50" label="Full Name" type="text" placeholder="username" name="username" onChange={(e) => setName(e.target.value)} />
//         <label>Email</label>
//         <input className="text-sm border rounded mb-5 w-full py-2 px-3 text-slate-700 placeholder: opacity-50" label="Email" type="email" placeholder="example@gmail.com" name="email" onChange={(e) => setEmail(e.target.value)} />
//         <label>Password</label>
//         <div className="relative">
//           <input
//             className="text-sm border rounded mb-5 w-full py-2 px-3 text-slate-700 placeholder: opacity-50"
//             label="Password"
//             type={showPassword ? 'text' : 'password'}
//             placeholder="*********"
//             name="password"
//             onChange={(e) => setPasword(e.target.value)}
//           />
//           {/* Password visibility toggle button */}
//           <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 py-2 px-3 px-2 text-sm">
//             {showPassword ? 'Hide' : 'Show'}
//           </button>
//         </div>
//         <GoogleLogin
//           // clientId="62931102438-6u0inouulvu673sbrlnpghfirjd0vi0f.apps.googleusercontent.com"
//           onSuccess={responseGoogle}
//           onFailure={onFailureGoogle}
//           render={(renderProps) => (
//             <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="bg-red-600 w-full text-white h-12 rounded-md">
//               Register with Google
//             </button>
//           )}
//         />

//         <button className="bg-blue-600 w-full text-white h-12 rounded-md">Register</button>
//       </form>
//     </GoogleOAuthProvider>
//   );
// };

// export default FormRegister;
