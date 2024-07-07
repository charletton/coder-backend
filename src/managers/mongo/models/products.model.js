import mongoose from "mongoose";

const collection = "Products";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    code: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    category : {
        type: String,
        required: true,
    }
})

const productModel = new mongoose.model(collection, schema);

export default productModel