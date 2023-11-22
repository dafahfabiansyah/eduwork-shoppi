import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { data } from 'autoprefixer';

const EditAdress = () => {
  const [kelurahan, setKelurahan] = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [kota, setKota] = useState('');
  const [provinsi, setProvinsi] = useState('');
  const [detail, setDetail] = useState('');
  const [name, setName] = useState('');

  const { enqueueSnackbar } = useSnackbar();
  const { _id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/adress/${_id}`)
      .then((res) => {
        setName(res.data.name || '');
        setKelurahan(res.data.kelurahan || '');
        setKecamatan(res.data.kecamatan || '');
        setKota(res.data.kota || '');
        setProvinsi(res.data.provinsi || '');
        setDetail(res.data.detail || '');
      })

      .catch((err) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      });
  }, [_id]);

  const handleEditAdress = (e) => {
    const data = {
      name,
      kelurahan,
      kecamatan,
      kota,
      provinsi,
      detail,
    };
    axios
      .put(`http://localhost:5000/api/adress/${_id}`, data)
      .then(() => {
        enqueueSnackbar('Alamat berhasil di edit', { variant: 'success' });
        navigate('/checkout');
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      });
    e.preventDefault();
  };

  return (
    <section className=" shadow shadow-2xl   h-screen flex items-center">
      <div className="w-[40%] mx-auto border rounded-lg ">
        <h1 className="text-center text-2xl font-bold mt-5 text-blue-500 mb-5">Alamat</h1>
        <form className="w-[80%] mx-auto mt-5 mb-8">
          <label>name </label>
          <br />
          <input type="text" placeholder="Masukan name" name="name" className="text-sm border rounded w-full py-2 px-3 text-slate-800 placeholder: opacity-50" value={name} onChange={(e) => setName(e.target.value)} />
          <label>Kelurahan </label>
          <br />
          <input type="text" placeholder="Masukan Kelurahan" name="kelurahan" className="text-sm border rounded w-full py-2 px-3 text-slate-800 placeholder: opacity-50" value={kelurahan} onChange={(e) => setKelurahan(e.target.value)} />
          <label>Kecamatan </label>
          <br />
          <input type="text" placeholder="Masukan Kecamatan" name="Kecamatan" className="text-sm border rounded w-full py-2 px-3 text-slate-800 placeholder: opacity-50" value={kecamatan} onChange={(e) => setKecamatan(e.target.value)} />
          <label>Kota </label>
          <br />
          <input type="text" placeholder="Masukan Kota" name="Kota" className="text-sm border rounded w-full py-2 px-3 text-slate-800 placeholder: opacity-50" value={kota} onChange={(e) => setKota(e.target.value)} />
          <label>Provinsi </label>
          <br />
          <input type="text" placeholder="Masukan Provinsi" name="Provinsi" className="text-sm border rounded w-full py-2 px-3 text-slate-800 placeholder: opacity-50" value={provinsi} onChange={(e) => setProvinsi(e.target.value)} />
          <label>Detail </label>
          <br />
          <input type="text" placeholder="Masukan Detail" name="Detail" className="text-sm border rounded w-full py-2 px-3  h-[100px] text-slate-800 placeholder: opacity-50" value={detail} onChange={(e) => setDetail(e.target.value)} />
          <button className="bg-blue-500 w-full  text-white h-12  rounded-md mt-5" onClick={handleEditAdress}>
            Simpan
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditAdress;
