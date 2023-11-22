const express = require('express');
const router = express.Router();
const Adress = require('../model/adressModel');

async function getAdress(req, res, next) {
  try {
    const address = await Adress.findById(req.params.id);
    if (address == null) {
      return res.status(404).json({ message: 'Alamat tidak ditemukan' });
    }

    res.locals.address = address;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  return next();
}

// Mendapatkan semua alamat
router.get('/', async (req, res) => {
  try {
    const addresses = await Adress.find().populate('user');
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mendapatkan alamat untuk pengguna tertentu
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const userAddresses = await Adress.find({ user: userId }).populate('user');
    res.status(200).json(userAddresses);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Menambah alamat baru
router.post('/', async (req, res) => {
  const address = new Adress({
    name: req.body.name,
    kelurahan: req.body.kelurahan,
    kecamatan: req.body.kecamatan,
    kota: req.body.kota,
    provinsi: req.body.provinsi,
    user: req.body.user,
    detail: req.body.detail,
  });

  try {
    const newAddress = await address.save();
    res.status(201).json({ message: 'Alamat berhasil dibuat', data: newAddress });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Mendapatkan detail alamat berdasarkan ID
router.get('/:id', getAdress, (req, res) => {
  res.json(res.locals.address);
});

// Menghapus alamat berdasarkan ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Adress.findByIdAndDelete(id);
    if (!address) {
      return res.status(404).json({ message: 'Alamat tidak ditemukan' });
    }
    res.json({ message: 'Alamat berhasil dihapus', data: address });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Memperbarui alamat
router.put('/:id', async (req, res) => {
  try {
    const payload = req.body;
    const { id } = req.params;
    const address = await Adress.findByIdAndUpdate(id, payload, { new: true });
    if (!address) {
      return res.status(404).json({ message: 'Alamat tidak ditemukan' });
    }
    res.status(200).json({ message: 'Alamat berhasil diperbarui', data: address });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
