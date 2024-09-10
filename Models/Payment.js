import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema({
    orderDate: { type: String, default:Date.now },
    payStatus :{type:String}
}, { strict: false })
export const Payment = mongoose.model("Payment",paymentSchema)