import React from 'react';
import { Link } from 'react-router-dom';

import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useSnackbar } from 'notistack';

const DeleteAddress = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleDeleteAddress = async () => {
    await axios
      .delete(`http://localhost:5000/api/address/${_id}`)
      .then(() => {
        enqueueSnackbar('Address deleted successfully', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      });
  };
  console.log(_id);
  return (
    <div className="p-4">
      <h1 className="text-3xl my-4"> Delete Address</h1>

      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto ">
        <h3 className="text-2xl">Are you sure you want to delete address?</h3>
        <Link to="/checkout">
          <button className="p-4 bg-red-600 text-white m-8 " onClick={handleDeleteAddress}>
            Yes, Delete it
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DeleteAddress;
