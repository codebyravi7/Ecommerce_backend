import express from "express";
import mongoose from "mongoose";
import bodyParser from "express";
import userRouter from "./Routes/user.js";
import productRouter from "./Routes/product.js";
import cartRouter from "./Routes/cart.js";
import addressRouter from "./Routes/address.js";
import paymentRouter from "./Routes/payment.js";
import cors from "cors";

const app = express();
app.use(bodyParser.json());

//cors used to connect backend and front end
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
//home test
app.get("/", (req, res) => {
  res.json({ message: "This is home route" });
});
//user Router
app.use("/api/user", userRouter);

//product router
app.use("/api/product", productRouter);

//cart router
app.use("/api/cart", cartRouter);

//addres Router
app.use("/api/address", addressRouter);

//payment Router
app.use("/api/payment", paymentRouter);

//connection
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_ACCNAME}:${process.env.MONGO_DB_ACCPSWD}@cluster0.vl7ev.mongodb.net/`,
    {
      dbName: "MernECommerce",
    }
  )
  .then(() => console.log("Mongo Db connected Successfully!!!"))
  .catch((err) => console.log("Error->", err));

const port = 1000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
