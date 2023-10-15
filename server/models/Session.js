"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.default = (0, mongoose_1.model)('Session', new mongoose_1.Schema({
    uid: { ref: 'User', type: mongoose_1.Schema.ObjectId, required: true },
    date: {
        type: Date,
        default: Date.now,
    },
    device: {
        IP: { type: String, required: true },
        OS: { type: String, default: 'Unknown' },
    },
    location: {
        city: { type: String, default: 'unknown' },
        country: { type: String, default: 'unknown' },
    },
}));
