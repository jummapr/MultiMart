"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createActivationTokenForShop = exports.createActivationToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createActivationToken = (user) => {
    const activationToken = jsonwebtoken_1.default.sign(user, process.env.ACTIVATION_TOKEN_SECRET, {
        expiresIn: "5m",
    });
    return activationToken;
};
exports.createActivationToken = createActivationToken;
const createActivationTokenForShop = (user) => {
    const activationToken = jsonwebtoken_1.default.sign(user, process.env.ACTIVATION_TOKEN_SECRET, {
        expiresIn: "5m",
    });
    return activationToken;
};
exports.createActivationTokenForShop = createActivationTokenForShop;
//# sourceMappingURL=generateActiveationLink.js.map