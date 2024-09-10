import RazorPay from "razorpay";
import { Payment } from "../Models/Payment.js";
import dotenv from "dotenv";

dotenv.config();

const razorpay = new RazorPay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//checkout
export const checkout = async (req, res) => {
  const { amount, cartItems, userShipping, userId } = req.body;
  const options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };
  const order = await razorpay.orders.create(options);
  return res.json({
    orderId: order.id,
    amount,
    cartItems,
    userShipping,
    userId,
    payStatus: "created",
  });
};

export const verify = async (req, res) => {
  const {
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
  } = req.body;

  let saveToDb = await Payment.create({
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
    payStatus: "paid",
  });
  return res.json({
    message: "Payment Successfull",
    success: true,
    orderConfirm: true,
  });
};

//user specific order
export const userOrder = async (req, res) => {
  const userId = req.user._id.toString();
  const orders = await Payment.find({ userId }).sort({ orderDate: -1 });
  res.json(orders);
};
//all orders
export const allOrder = async (req, res) => {
  const orders = await Payment.find().sort({ orderDate: -1 });
  res.json(orders);
};
