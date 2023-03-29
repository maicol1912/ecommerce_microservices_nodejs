import mongoose from "mongoose"

const Schema = mongoose.Schema;

const AdressSchema = new Schema({
    street: String,
    postalCode: String,
    city: String,
    country: String
})

export const Adress = mongoose.model('adress', AdressSchema)