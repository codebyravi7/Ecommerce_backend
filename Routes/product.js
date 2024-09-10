import express from "express";
import {
  addProduct,
  getProductById,
  getProducts,
  updateProductById,
  deleteProductById,
} from "../Controllers/product.js";
const router = express.Router();

//add product
router.post("/add", addProduct);

//get all product
router.get("/all", getProducts);

//find one product by id
router.get("/:id", getProductById);

//find one product by id and update
router.put("/:id", updateProductById);

//find one product by id and delete
router.delete("/:id", deleteProductById);

export default router;
