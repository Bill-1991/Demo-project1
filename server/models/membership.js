import mongoose from "mongoose";
const Schema = mongoose.Schema;

const membershipSchema = new Schema({
    qrSvg:{
        type: String,
        required: true
    },
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

const dbMembership = mongoose.model('memberships', membershipSchema);

export default dbMembership;