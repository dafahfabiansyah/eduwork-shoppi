const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  kelurahan: {
    type: String,
    required: true,
  },
  kecamatan: {
    type: String,
    required: true,
  },
  kota: {
    type: String,
    required: true,
  },
  provinsi: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  detail: {
    type: String,
  },
});

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;
