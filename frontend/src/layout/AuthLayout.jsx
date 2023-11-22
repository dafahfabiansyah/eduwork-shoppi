import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DarkMode } from '../contexts/DarkModeContext';
import keySvg from '../img/DrawKit Vector Illustration Real Estate & Homeowner Illustrations (15).svg';
import login from '../img/—Pngtree—cyber security concept in 3d_7601742.png';

const AuthLayout = (props) => {
  const { title, children, type } = props;
  //memanggil darkMode

  return (
    <div className={`flex bg-orange-50 w-full bg-no-repeat bg-cover bg-center min-h-screen items-center`}>
      <div className="flex flex-col md:flex-row w-full justify-center items-center">
        <div className="w-[23%] md:w-[30%] justify-center flex py-[50px] px-5 rounded-[20px] bg-white bg-opacity-80 border border-blue-600 mr-5">
          <div className="w-full max-w-xs">
            <h1 className="text-blue-600 text-3xl font-bold mb-3 text-center"> {title}</h1>
            <p className="font-medium text-black mb-8 text-center capitalize">welcome please enter your details</p>
            {children}
            <Navigation type={type} />
          </div>
        </div>
        <div className="hidden md:flex justify-center items-center">
          <img src={login} alt="Key Illustration" className="w-64 h-auto" />
        </div>
      </div>
    </div>
  );
};
// conditional dalam bentuk if else
const Navigation = ({ type }) => {
  if (type === 'login') {
    return (
      <p className="text-sm mt-5 text-center">
        Dont have an account?{' '}
        <Link to="/Register" className="font-bold text-blue-600">
          <strong>Register</strong>
        </Link>
      </p>
    );
  } else {
    return (
      <p className="text-sm mt-5 text-center text-black">
        Already have an account?{' '}
        <Link to="/Login" className="font-bold text-blue-600">
          <strong>Login</strong>
        </Link>
      </p>
    );
  }
};
export default AuthLayout;
