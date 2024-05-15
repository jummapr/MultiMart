import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import ApiError from "./utils/ApiError";
import bodyParser from "body-parser";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CROSS_ORIGIN,
    credentials: true,
  })
);

// app.use((_, res, next) => {
//   res.header('Access-Control-Allow-Origin', process.env.CROSS_ORIGIN);
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   next();
// });
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.urlencoded());

// import route
import userRoute from "./routes/user.route";
import shopRoute from "./routes/shop.route";
import productRoute from "./routes/product.route";
import eventRoute from "./routes/event.route";
import couponRoute from "./routes/coupoun.route";

app.use("/api/v1/user", userRoute);
app.use("/api/v1/shop", shopRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/event", eventRoute);
app.use("/api/v1/coupon", couponRoute);

export default app;
