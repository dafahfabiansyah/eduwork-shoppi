import React, { useContext, useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { AiOutlineCheckCircle } from 'react-icons/ai';

import { AddressContext } from '../contexts/adressContext';
import { CartContext } from '../contexts/CartContext';
import Header from '../fragment/Header';
import { Link } from 'react-router-dom';

const InvoicePage = () => {
  const { cart, total, itemAmount } = useContext(CartContext);
  const { address } = useContext(AddressContext);

  const CopyToClipboard = ({ textToCopy }) => {
    const handleCopy = () => {
      copy(textToCopy);
      alert('Nomor rekening telah disalin: ' + textToCopy);
    };

    return (
      <span className="cursor-pointer" onClick={handleCopy}>
        {textToCopy}
      </span>
    );
  };

  const rekeningInfo = 'dafah fabian syah, KEB Hana bank, 10477872460';

  return (
    <>
      <Header />
      <section className="bg-orange-50">
        <div className=" flex items-center">
          <div className=" bg-white p-5 w-[800px] h-[80%] mx-auto border rounded-lg capitalize">
            <h1 className="text-center text-4xl font-bold mt-14 text-blue-500 mb-5">Invoice</h1>
            <AiOutlineCheckCircle className="text-3xl text-green-500 mx-auto" />
            <div className="mb-5">
              <span className="underline">Alamat : </span>

              <p>Atas Nama : {address[0].name}</p>
              <p>Kelurahan : {address[0].kelurahan}</p>
              <p>Kecamatan : {address[0].kecamatan}</p>
              <p>Kabupaten : {address[0].kota}</p>
              <p>Provinsi : {address[0].provinsi}</p>
              <p>Detail : {address[0].detail}</p>

              <span>
                Payment to: <CopyToClipboard textToCopy={rekeningInfo} cl />
              </span>

              <table className="mx-8 my-3 w-[80%]">
                <thead>
                  <tr>
                    <th className="border">No</th>
                    <th className="border">Item</th>
                    <th className="border">Jumlah</th>
                    <th className="border">Harga</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {cart.map((item, index) => (
                    <tr key={item._id}>
                      <td className="border">{index + 1}</td>
                      <td className="border">{item.name}</td>
                      <td className="border">{item.amount}</td>
                      <td className="border">Rp. {item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <span className="grid grid-cols-3 gap-4 ml-5 text-xl  mb-2">
                <span>Ongkos Kirim</span>
                <span> :</span>
                <span className="text-red-500">Free</span>
              </span>
              <span className="grid grid-cols-3 gap-4 ml-5 text-xl  mb-2">
                <span>Total</span>
                <span> :</span>
                <span>Rp. {total}</span>
              </span>
            </div>
            <Link to="/profile">
              <button className="mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">Check Order</button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default InvoicePage;
