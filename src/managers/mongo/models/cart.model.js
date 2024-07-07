import mongoose from "mongoose";

const collection = "Carts";

const ProductSchema = new mongoose.Schema({
  product: {
    type: Number, 
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

const schema = new mongoose.Schema({
    products: {
        type: [ProductSchema],
        default: [],
    },
});


const cartModel = new mongoose.model(collection, schema);

export default cartModel