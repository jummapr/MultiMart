"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTheOldPicture = void 0;
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const uploadOnCloudinary = async (file) => {
    try {
        if (!file) {
            return null;
        }
        // upload the file on cloudinary
        const result = await cloudinary_1.v2.uploader.upload(file, {
            resource_type: "auto",
            folder: "Ecomersh-website-image",
        });
        // console.log(result, "Result");
        // fill has been uploaded
        console.log("File has been uploaded", result.url);
        fs_1.default.unlinkSync(file); // removed locally temporary file
        return result;
    }
    catch (error) {
        fs_1.default.unlinkSync(file); // removed locally temporary file
        return null;
    }
};
const deleteTheOldPicture = async (file) => {
    try {
        if (!file) {
            return null;
        }
        const result = await cloudinary_1.v2.uploader.destroy(file);
        return result;
    }
    catch (error) {
        console.log("Error while deleting the old image");
        return null;
    }
};
exports.deleteTheOldPicture = deleteTheOldPicture;
exports.default = uploadOnCloudinary;
//# sourceMappingURL=cloudinary.js.map