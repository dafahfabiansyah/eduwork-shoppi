const express = require('express');
const router = express.Router();
const Order = require('../model/orderModel'); // Pastikan path ke model Order sudah sesuai
const OrderItem = require('../model/orderItemModel'); // Pastikan path ke model OrderItem sudah sesuai

// Endpoint untuk membuat order
router.post('/create-order', async (req, res) => {
  try {
    // Ambil data dari request body atau sesuaikan dengan kebutuhan Anda
    const { status, delivery_fee, address, user, order_items } = req.body;

    // Pastikan order_items adalah array yang valid dari OrderItem IDs
    const validOrderItemIDs = await OrderItem.find({ _id: { $in: order_items } }, '_id');
    const invalidOrderItemIDs = order_items.filter((item) => !validOrderItemIDs.map(String).includes(item));

    if (invalidOrderItemIDs.length > 0) {
      return res.status(400).json({ message: 'Invalid OrderItem IDs in order_items array' });
    }

    // Buat objek Order
    const newOrder = new Order({
      status,
      delivery_fee,
      address,
      user,
      order_items,
    });

    // Simpan order ke database
    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint untuk mendapatkan semua orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().populate('order_items');
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint untuk mendapatkan order berdasarkan ID
router.get('/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('order_items');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
