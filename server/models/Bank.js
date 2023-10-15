"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.default = (0, mongoose_1.model)('Bank', new mongoose_1.Schema({
    uid: {
        ref: 'User',
        type: mongoose_1.Schema.ObjectId,
        required: true,
    },
    name: {
        type: String,
        enum: ['CB', 'AYA', 'KBZ'],
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'verified', 'rejected'],
        default: 'pending',
    },
    account: {
        holder: { type: String, required: true },
        number: { type: String, unique: true, required: true },
    },
}));
