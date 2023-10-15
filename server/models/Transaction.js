"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.default = (0, mongoose_1.model)('Transaction', new mongoose_1.Schema({
    type: {
        type: String,
        enum: ['bank', 'topup', 'payment'],
        default: 'payment',
    },
    note: String,
    date: {
        type: Date,
        default: Date.now,
    },
    payer: String,
    payee: String,
    amount: {
        type: Number,
        required: true,
    },
}));
