import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdAdd, IoMdClose, IoMdRemove } from 'react-icons/io';
import { CartContext } from '../contexts/CartContext';

const CartItem = ({ item }) => {
  const { name, _id, image_url, price, amount, user } = item;

  const { increaseAmount, decreaseAmount, removeCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState(amount);

  const isLoggedInUserItem = user && user._id === localStorage.getItem('userId');

  const handleQuantityChange = (newQuantity) => {
    // Update local state for quantity
    setQuantity(newQuantity);

    // Update the quantity in the cart context
    if (newQuantity > amount) {
      increaseAmount(_id);
    } else if (newQuantity < amount) {
      decreaseAmount(_id);
    }
  };

  if (!isLoggedInUserItem) {
    return null;
  }

  return (
    <div className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 items-center flex justify-center mx-auto w-[90%] ">
      <div className="w-full min-h-[150px] flex items-center gap-x-4">
        <Link to={`/product/${_id}`}>
          <img className="max-w-[80px] rounded rounded-lg " src={`http://localhost:5000/${image_url}`} alt={name} />
        </Link>
        <div className="w-full flex flex-col">
          <div className="flex justify-between mb-2">
            <Link to={`/product/${_id}`} className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline">
              {name}
            </Link>
            <div className="text-xl cursor-pointer" onClick={() => removeCart(_id)}>
              <IoMdClose className="text-gray-500 hover:bg-red-500 hover:text-white rounded-full transition duration-300" />
            </div>
          </div>
          <div className="flex gap-x-2 h-[36px] text-item mt-1">
            <div className="flex flex-1 max-w-[100px] items-center text-primary font-medium">
              <div className="flex-1 h-full flex flex-col items-center justify-center">
                <div className="cursor-pointer" onClick={() => handleQuantityChange(quantity - 1)}>
                  <IoMdRemove />
                </div>
                <input type="number" value={quantity} onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))} className=" h-full text-center justify-center border border-gray-200 focus:outline-none my-2" />
                <div className="cursor-pointer" onClick={() => handleQuantityChange(quantity + 1)}>
                  <IoMdAdd />
                </div>
              </div>
            </div>
            <div className="flex flex-1 items-center justify-center">{`Rp ${price}`}</div>
            <div className="flex flex-1 justify-end items-center text-primary font-medium"> {price * quantity > 0 ? `Rp ${parseFloat(price * quantity).toFixed(0)}` : 'Rp 0'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
