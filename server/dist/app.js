"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.CROSS_ORIGIN,
    credentials: true,
}));
// app.use((_, res, next) => {
//   res.header('Access-Control-Allow-Origin', process.env.CROSS_ORIGIN);
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   next();
// });
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json({ limit: "10kb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
app.use(body_parser_1.default.urlencoded());
// import route
const user_route_1 = __importDefault(require("./routes/user.route"));
const shop_route_1 = __importDefault(require("./routes/shop.route"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const event_route_1 = __importDefault(require("./routes/event.route"));
const coupoun_route_1 = __importDefault(require("./routes/coupoun.route"));
const payment_route_1 = __importDefault(require("./routes/payment.route"));
const order_route_1 = __importDefault(require("./routes/order.route"));
app.use("/api/v1/user", user_route_1.default);
app.use("/api/v1/shop", shop_route_1.default);
app.use("/api/v1/product", product_route_1.default);
app.use("/api/v1/event", event_route_1.default);
app.use("/api/v1/coupon", coupoun_route_1.default);
app.use("/api/v1/payment", payment_route_1.default);
app.use("/api/v1/order", order_route_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map