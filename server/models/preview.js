import mongoose from "mongoose";
const Schema = mongoose.Schema;

const previewSchema = new Schema({
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
    contactUrl: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    },
    vCardPhoto: {
        type: String,
        required: true
    },
    preview: {
        type: Boolean,
        required: true
    }

}, { timestamps: true });

const dbPreview = mongoose.model('preview', previewSchema);

export default dbPreview;