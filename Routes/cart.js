import express from 'express'
import { addToCart, clearCart, decreaseProductQty, removeProductFromCart, userCart } from '../Controllers/cart.js'

import { Authenticated } from '../Middleware/auth.js';

const router = express.Router();

//add to cart
router.post('/add',Authenticated, addToCart);

//get user cart
router.get("/user", Authenticated, userCart);

//remove from cart
router.delete("/remove/:productId", Authenticated, removeProductFromCart);

//clear cart
router.delete("/clear", Authenticated, clearCart);

//decrease quantity
router.post("/--qty", Authenticated, decreaseProductQty);
export default router;