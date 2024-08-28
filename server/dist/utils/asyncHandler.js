"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = (handler) => async (req, res, next) => {
    try {
        await handler(req, res, next);
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "internal server error"
        });
    }
};
exports.default = asyncHandler;
//# sourceMappingURL=asyncHandler.js.map