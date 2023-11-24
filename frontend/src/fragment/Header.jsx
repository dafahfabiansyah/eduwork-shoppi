import React, { useContext, useEffect, useState } from 'react';

import { IoBagHandleOutline, IoLogInOutline } from 'react-icons/io5';
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import Icon from '../img/icon.png';
import AuthContext from '../contexts/AuthContext';

const Header = () => {
  const [isActive, setIsActive] = useState(true);

  const { itemAmount } = useContext(CartContext);
  const { loggedIn, getLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    getLoggedIn();
  }, [getLoggedIn]);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  });

  const username = localStorage.getItem('username');
  return (
    <header className={`${isActive ? 'bg-white py-4 shadow-md' : 'bg-none py-6'} fixed w-full z-20 transition-all`}>
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link to={'/'}>
          <div>
            <img className="w-[40px]" src={Icon} />
          </div>
        </Link>{' '}
        {loggedIn === false ? (
          <Link to={'/login'} className="hover:bg-blue-500 hover:text-white transition duration-300  p-2 rounded-full">
            <div className="cursor-pointer grid md:grid-cols-2 ">
              <IoLogInOutline className="text-2xl" />
              <p>Login</p>
            </div>
          </Link>
        ) : (
          <Link to={'/profile'}>
            {' '}
            <button className="  rounded text-black hover:text-white font-bold font-xl rounded-lg hover:bg-sky-600  transition duration-300 px-4 py-2">{username}</button>
          </Link>
        )}
        <Link to={'/cart'} className="hover:bg-blue-500 hover:text-white transition duration-300  p-2 rounded-full">
          <div className="cursor-pointer flex relative ">
            <IoBagHandleOutline className="text-2xl" />
            <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] text-white rounded-full flex justify-center items-center">{itemAmount} </div>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
