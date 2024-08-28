"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = void 0;
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const error = (err, req, res, next) => {
    // wrong mongoose id error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ApiError_1.default(404, message, err);
    }
    // mongoose duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ApiError_1.default(400, message, err);
    }
    // wrong jwt error
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid, Try again`;
        err = new ApiError_1.default(400, message, err);
    }
    // jwt expire error
    if (err.name === "TokenExpiredError") {
        const message = `Json Web Token has expired`;
        err = new ApiError_1.default(401, message, err);
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};
exports.error = error;
//# sourceMappingURL=error.js.map