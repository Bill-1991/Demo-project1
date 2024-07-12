import mongoose from "mongoose";
const Schema = mongoose.Schema;

const membershipSchema = new Schema({
    short: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    expires_at: {
        type: String,
        required: true
    }

}, { timestamps: true });

const dbMembership = mongoose.model('preview', membershipSchema);

export default dbMembership;