"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToken = void 0;
const ApiResponse_1 = __importDefault(require("./ApiResponse"));
const sendToken = async (user, statusCode, res, message) => {
    const token = user.getJwtToken();
    // Options for cookies
    const option = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        // secure: true,
        sameSite: 'None'
    };
    res.status(statusCode).cookie("token", token, {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    }).json(new ApiResponse_1.default(200, message, { user, token }));
};
exports.sendToken = sendToken;
//# sourceMappingURL=sendToken.js.map