"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../constants");
const dbUrl = process.env.MONGODB_URI || "";
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(`${dbUrl}/${constants_1.DB_NAME}`).then((data) => {
            console.log(`Database connected with ${data.connection.host}`);
        });
    }
    catch (error) {
        console.log(error.message);
        setTimeout(exports.connectDB, 5000);
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=index.js.map