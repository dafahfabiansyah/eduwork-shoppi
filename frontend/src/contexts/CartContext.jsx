import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [itemAmount, setItemAmount] = useState(0);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        console.log(userId);

        const response = await axios.get('http://localhost:5000/api/cart/user/' + userId);
        setCart(response.data);
        // // Ensure userId is available before making API calls
        // if (userId) {
        //   // const response = await axios.get(`http://localhost:5000/api/cart/user/${userId}`);
        // } else {
        //   // Handle the case where userId is not available
        //   console.error('User ID not found in localStorage');
        // }
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchData();
  }, []);

  const saveCartToLocalStorage = (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const addToCart = async (product, _id) => {
    const cartItem = cart.find((item) => item._id === _id);

    if (cartItem) {
      const newCart = cart.map((item) => (item._id === _id ? { ...item, amount: item.amount + 1 } : item));

      setCart(newCart);
      saveCartToLocalStorage(newCart);
    } else {
      const existingCartItem = cart.find((item) => item.name === product.name);

      if (existingCartItem) {
        const newCart = cart.map((item) => (item.name === product.name ? { ...item, amount: item.amount + 1 } : item));

        setCart(newCart);
        saveCartToLocalStorage(newCart);
      } else {
        const userId = localStorage.getItem('userId');
        const newItem = { ...product, amount: 1, userId };

        try {
          const response = await axios.post('http://localhost:5000/api/cart', {
            name: newItem.name,
            amount: newItem.amount,
            price: newItem.price,
            description: newItem.description,
            user: newItem.userId,
            image_url: newItem.image_url,
            product: newItem._id,
          });

          if (response.status === 201) {
            setCart((prevCart) => [...prevCart, newItem]);
            saveCartToLocalStorage([...cart, newItem]);
          } else {
            console.error('Error adding to cart:', response.data);
          }
        } catch (error) {
          console.error('Error adding to cart:', error);
        }
      }
    }
  };

  const removeCart = async (_id) => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.delete(`http://localhost:5000/api/cart/user/${userId}/${_id}`); // Perbaiki URL API

      if (response.status === 200) {
        const newCart = cart.filter((item) => item._id !== _id);
        setCart(newCart);
        saveCartToLocalStorage(newCart);
      } else {
        console.error('Error removing from cart:', response.data);
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearUserCart = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.delete(`http://localhost:5000/api/cart/user/${userId}`);

      if (response.status === 200) {
        setCart([]);
        saveCartToLocalStorage([]);
        enqueueSnackbar('Cart cleared successfully', { variant: 'success' });
      } else {
        enqueueSnackbar('Gagal Menghapus Cart', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error clearing user cart:', error);
    }
  };

  const increaseAmount = async (_id) => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.patch(`http://localhost:5000/api/cart/user/${userId}/${_id}/increase`);

      if (response.status === 200) {
        const updatedCart = cart.map((item) => (item._id === _id ? { ...item, amount: item.amount + 1 } : item));
        setCart(updatedCart);
        saveCartToLocalStorage(updatedCart);
      } else {
        console.error('Error increasing amount:', response.data);
      }
    } catch (error) {
      console.error('Error increasing amount:', error);
    }
  };

  const decreaseAmount = async (_id) => {
    try {
      const userId = localStorage.getItem('userId');
      const cartItem = cart.find((item) => item._id === _id);

      if (cartItem && cartItem.amount > 1) {
        // Kurangi jumlah item di client-side
        const newCart = cart.map((item) => (item._id === _id ? { ...item, amount: item.amount - 1 } : item));

        setCart(newCart);
        saveCartToLocalStorage(newCart);

        // Panggil endpoint server-side untuk mengurangkan jumlah item
        const response = await axios.patch(`http://localhost:5000/api/cart/user/${userId}/${_id}/decrease`);

        if (response.status === 200) {
          // Item telah berhasil diupdate di server
          if (cartItem.amount - 1 < 1) {
            // Hapus item jika jumlah kurang dari 1 setelah pembaruan selesai
            removeCart(_id);
          }
        } else {
          console.error('Error decreasing item amount:', response.data);
        }
      }
    } catch (error) {
      console.error('Error decreasing item amount:', error);
    }
  };

  useEffect(() => {
    const amount = cart.reduce((accumulator, currentItem) => accumulator + currentItem.amount, 0);
    setItemAmount(amount);
  }, [cart]);

  useEffect(() => {
    const newTotal = cart.reduce((accumulator, currentItem) => accumulator + currentItem.price * currentItem.amount, 0);
    setTotal(newTotal);
  }, [cart]);

  return <CartContext.Provider value={{ cart, addToCart, removeCart, increaseAmount, decreaseAmount, itemAmount, total, clearUserCart }}>{children}</CartContext.Provider>;
};

export default CartProvider;
