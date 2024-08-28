"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserPassword = exports.deleteUserAddress = exports.updateUserAddress = exports.updateUserAvatar = exports.updateUserInfo = exports.shopLogout = exports.loadSellerUser = exports.LoginToShop = exports.activateShop = exports.createShop = exports.logoutUser = exports.loadUser = exports.loginUser = exports.activateUser = exports.registerUser = void 0;
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const ApiResponse_1 = __importDefault(require("../utils/ApiResponse"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const user_model_1 = __importDefault(require("../models/user.model"));
const cloudinary_1 = __importStar(require("../utils/cloudinary"));
const generateActiveationLink_1 = require("../utils/generateActiveationLink");
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendToken_1 = require("../utils/sendToken");
const shop_model_1 = __importDefault(require("../models/shop.model"));
const sendShopToken_1 = require("../utils/sendShopToken");
const redis_1 = require("../utils/redis");
exports.registerUser = (0, asyncHandler_1.default)(async (req, res, next) => {
    // get data from req.body or from client
    // Validation - check if empty
    // check if the user already exist or not.
    // get the file
    const { name, email, password } = req.body;
    console.log(req.body);
    if (!name || !email || !password) {
        throw new ApiError_1.default(400, "All fields are required");
    }
    // check if the user exists
    const user = await user_model_1.default.findOne({ email });
    if (user) {
        throw new ApiError_1.default(400, "User already exists");
    }
    const fileName = req.file?.path;
    const uploadedOnCloudinary = await (0, cloudinary_1.default)(fileName);
    const userData = {
        name,
        email,
        password,
        avatar: {
            public_id: uploadedOnCloudinary?.public_id,
            url: uploadedOnCloudinary?.secure_url,
        },
    };
    const activationToken = (0, generateActiveationLink_1.createActivationToken)(userData);
    const activationUrl = `http://localhost:3000/activation/${activationToken}`;
    const data = {
        user: {
            name: userData.name,
        },
        activationUrl,
    };
    const html = await ejs_1.default.renderFile(path_1.default.join(__dirname, "../mails/activation.link.ejs"), data);
    try {
        await (0, sendMail_1.default)({
            email: userData.email,
            subject: "Activate your account",
            template: "activation.link.ejs",
            data,
        });
        return res
            .status(201)
            .json(new ApiResponse_1.default(200, `please check your email:- ${userData.email}`));
    }
    catch (error) {
        console.log(error);
        throw new ApiError_1.default(500, error.message, error);
    }
});
exports.activateUser = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { activation_token } = req.params;
    const newUser = jsonwebtoken_1.default.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET);
    console.log("verify JWT token");
    if (!newUser) {
        throw new ApiError_1.default(400, "Invalid token");
    }
    const { name, email, password, avatar } = newUser;
    console.log("destructure the data");
    let user = await user_model_1.default.findOne({ email });
    if (user) {
        throw new ApiError_1.default(400, "User already exist");
    }
    user = await user_model_1.default.create({
        name,
        email,
        password,
        avatar,
    });
    (0, sendToken_1.sendToken)(user, 201, res, "user account activated successfully");
});
// Login user
exports.loginUser = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError_1.default(400, "All fields are required");
    }
    const user = await user_model_1.default.findOne({ email }).select("+password");
    if (!user) {
        throw new ApiError_1.default(400, "Invalid credentials");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new ApiError_1.default(400, "Invalid credentials");
    }
    (0, sendToken_1.sendToken)(user, 200, res, "User Login Success");
});
// Load user
exports.loadUser = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { id } = req.user;
    const cachedValue = await redis_1.redis.get(`user:${id}`);
    if (cachedValue) {
        return res
            .status(200)
            .json(new ApiResponse_1.default(200, "User fetched from cache.", JSON.parse(cachedValue)));
    }
    const user = await user_model_1.default.findById(id);
    await redis_1.redis.set(`user:${id}`, JSON.stringify(user));
    if (!user) {
        throw new ApiError_1.default(400, "User doesn't exist.");
    }
    res.status(200).json(new ApiResponse_1.default(200, "user fetched.", user));
});
// logout the user
exports.logoutUser = (0, asyncHandler_1.default)(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res
        .status(200)
        .json(new ApiResponse_1.default(200, "Successfully logged out.", null));
});
// create shop
exports.createShop = (0, asyncHandler_1.default)(async (req, res, next) => {
    const shopData = req.body;
    const { address, email, shopName, password, zipcode, description, phoneNumber, } = shopData;
    const sellerEmail = await shop_model_1.default.findOne({ email });
    if (sellerEmail) {
        const fileName = req.file.filename;
        await (0, cloudinary_1.default)(fileName);
        throw new ApiError_1.default(400, "User already exist.");
    }
    const fileName = req.file?.path;
    console.log(fileName);
    const uploadedOnCloudinary = await (0, cloudinary_1.default)(fileName);
    console.log("Cloudinary URl", uploadedOnCloudinary.url);
    const sellerData = {
        shopName,
        description,
        email,
        phoneNumber,
        address,
        zipcode,
        password,
        avatar: {
            public_id: uploadedOnCloudinary?.public_id,
            url: uploadedOnCloudinary?.secure_url,
        },
    };
    console.log(sellerData);
    const activationToken = (0, generateActiveationLink_1.createActivationTokenForShop)(sellerData);
    const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`;
    const data = {
        user: {
            name: sellerData.shopName,
        },
        activationUrl,
    };
    const html = await ejs_1.default.renderFile(path_1.default.join(__dirname, "../mails/activation.link.ejs"), data);
    try {
        await (0, sendMail_1.default)({
            email: sellerData.email,
            subject: "Activate your shop",
            template: "activation.link.ejs",
            data,
        });
        return res
            .status(201)
            .json(new ApiResponse_1.default(200, `Please check your email to verify your shop:- ${sellerData.email}`));
    }
    catch (error) {
        console.log(error);
        throw new ApiError_1.default(500, error.message, error);
    }
});
// active shop
exports.activateShop = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { activation_token } = req.params;
    const newUser = jsonwebtoken_1.default.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET);
    console.log("verify JWT token");
    if (!newUser) {
        throw new ApiError_1.default(400, "Invalid token");
    }
    const { address, email, shopName, password, zipcode, description, phoneNumber, avatar, } = newUser;
    console.log(avatar);
    console.log("destructure the data");
    let seller = await shop_model_1.default.findOne({ email });
    if (seller) {
        throw new ApiError_1.default(400, "User already exist");
    }
    seller = await shop_model_1.default.create({
        shopName,
        description,
        email,
        phoneNumber,
        address,
        zipcode,
        password,
        avatar,
    });
    (0, sendShopToken_1.sendShopToken)(seller, 201, res, "user shop activated successfully");
});
// Login to shop
exports.LoginToShop = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError_1.default(400, "All fields are required");
    }
    const user = await shop_model_1.default.findOne({ email }).select("+password");
    if (!user) {
        throw new ApiError_1.default(400, "Invalid credentials");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new ApiError_1.default(400, "Invalid credentials");
    }
    (0, sendShopToken_1.sendShopToken)(user, 201, res, "user login to shop successfully.");
});
exports.loadSellerUser = (0, asyncHandler_1.default)(async (req, res, next) => {
    console.log(req.user);
    const { id } = req.user;
    const user = await shop_model_1.default.findById(id);
    if (!user) {
        throw new ApiError_1.default(400, "Seller doesn't exist.");
    }
    res.status(200).json(new ApiResponse_1.default(200, "Seller fetched.", user));
});
// shop logout
exports.shopLogout = (0, asyncHandler_1.default)(async (req, res, next) => {
    res.cookie("seller_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res
        .status(200)
        .json(new ApiResponse_1.default(200, "Successfully logged out.", null));
});
// update user informatuon
exports.updateUserInfo = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { id } = req.user;
    const { name, email, password, phoneNumber } = req.body;
    const user = await user_model_1.default.findById(id).select("+password");
    if (!user) {
        throw new ApiError_1.default(400, "User doesn't exist.");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new ApiError_1.default(400, "Invalid credentials");
    }
    user.name = name;
    user.email = email;
    user.phoneNumber = phoneNumber;
    await user.save();
    res
        .status(200)
        .json(new ApiResponse_1.default(200, "User updated successfully.", user));
});
// update user avatar
exports.updateUserAvatar = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { id } = req.user;
    const user = await user_model_1.default.findById(id);
    if (!user) {
        throw new ApiError_1.default(400, "User doesn't exist.");
    }
    if (user?.avatar?.public_id) {
        await (0, cloudinary_1.deleteTheOldPicture)(user.avatar.public_id);
    }
    const file = req.file;
    if (!file) {
        throw new ApiError_1.default(400, "Please upload a file.");
    }
    const uploadedOnCloudinary = await (0, cloudinary_1.default)(file?.path);
    if (!cloudinary_1.default) {
        throw new ApiError_1.default(400, "avatar not uploaded!, please try again.");
    }
    user.avatar.public_id = uploadedOnCloudinary.public_id;
    user.avatar.url = uploadedOnCloudinary.secure_url;
    await user.save();
    res
        .status(200)
        .json(new ApiResponse_1.default(200, "User avatar updated successfully", user));
});
// Update the user address
exports.updateUserAddress = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { id } = req.user;
    const { country, state, city, zipCode, address1, address2, addresstype } = req.body;
    const user = await user_model_1.default.findById(id);
    if (!user) {
        throw new ApiError_1.default(400, "User doesn't exist.");
    }
    const isAddressExist = user.address.find((address) => address.addresstype === addresstype);
    if (isAddressExist) {
        throw new ApiError_1.default(400, "address already exist");
    }
    const newAddress = {
        country,
        state,
        city,
        zipCode,
        address1,
        address2,
        addresstype,
    };
    user.address.push(newAddress);
    await user.save();
    await redis_1.redis.set(`user:${id}`, JSON.stringify(user));
    res
        .status(200)
        .json(new ApiResponse_1.default(200, "Address added successfully.", user));
});
exports.deleteUserAddress = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { id } = req.user;
    const addresstype = req.params.addresstype;
    console.log(addresstype);
    const user = await user_model_1.default.findById(id);
    if (!user) {
        throw new ApiError_1.default(400, "User doesn't exist.");
    }
    await redis_1.redis.set(`user:${id}`, "");
    // NOTE: what's the use of findIndex method?
    const addressIndex = user.address.findIndex((address) => address.addresstype === addresstype);
    console.log("Address Index", addressIndex);
    if (addressIndex === -1) {
        throw new ApiError_1.default(400, "Address not found.");
    }
    // NOTE: what's the use of splice method? is it efficient and good way to delete it?
    user.address.splice(addressIndex, 1);
    await user.save();
    await redis_1.redis.set(`user:${id}`, JSON.stringify(user));
    res
        .status(200)
        .json(new ApiResponse_1.default(200, "Address deleted successfully.", user));
});
// Update the user password
exports.updateUserPassword = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { id } = req.user;
    const { oldPassword, newPassword } = req.body;
    const user = await user_model_1.default.findById(id).select("+password");
    if (!user) {
        throw new ApiError_1.default(400, "User doesn't exist.");
    }
    // check if oldPassword and user password in database matched.
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
        throw new ApiError_1.default(400, "Old password doesn't match.");
    }
    user.password = newPassword;
    await user.save();
    res
        .status(200)
        .json(new ApiResponse_1.default(200, "Password updated successfully.", user));
});
//# sourceMappingURL=user.controller.js.map