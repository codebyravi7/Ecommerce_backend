import express from "express";
const router = express.Router();
import { checkout, verify, userOrder ,allOrder} from '../Controllers/payment.js'
import { Authenticated } from '../Middleware/auth.js'

//checkout
router.post('/checkout',checkout)

//verify payment and save to DB
router.post('/verify-payment',verify)

//user Order
router.get('/userorder',Authenticated,userOrder)

//all Order
router.get('/allorder',allOrder)

export default router;