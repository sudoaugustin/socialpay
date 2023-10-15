"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.default = (0, mongoose_1.model)('User', new mongoose_1.Schema({
    name: String,
    email: String,
    mobile: {
        type: String,
        unique: true,
        require: true,
    },
    secret: {
        type: String,
        require: true,
    },
    avatar: String,
    balance: {
        type: Number,
        default: 0,
    },
}));
