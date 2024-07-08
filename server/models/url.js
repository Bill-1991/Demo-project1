import mongoose from "mongoose";
const Schema = mongoose.Schema;

const urlSchecma = new Schema({
    urlName: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true
    },
    qrSvg: {
        type: String,
        required: true
    }
}, { timestamps: true });

const dbUrl = mongoose.model('url', urlSchecma);

export default dbUrl;