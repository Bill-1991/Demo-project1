import mongoose from "mongoose";
const Schema = mongoose.Schema;

const vCardSchema = new Schema({
    qrSvg: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    }

}, { timestamps: true });

const dbVCard = mongoose.model('vcard', vCardSchema);

export default dbVCard;