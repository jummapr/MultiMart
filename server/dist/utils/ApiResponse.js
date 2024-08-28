"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiResponse {
    success;
    message;
    data;
    statusCode;
    constructor(statusCode, message = "Success", data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = true;
    }
}
exports.default = ApiResponse;
//# sourceMappingURL=ApiResponse.js.map