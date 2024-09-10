import { Address } from "../Models/Address.js";

export const addAddress = async (req, res) => {
  let { fullName, address, city, state, country, pincode, phoneNumber } =
    req.body;
  // console.log("called in controller!!")
  let useraddress = await Address.create({
    userId: req.user,
    fullName,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber,
  });
  res.json({ message: "Address added", useraddress, success: true });
};
export const getAddress = async (req, res) => {
  let address = await Address.find({ userId: req.user }).sort({
    createdAt: -1,
  });
  if (address.length ==0) return res.json({ message: "No address found", success: false });

  res.json({ message: "address", useraddress: address[0] });
};
