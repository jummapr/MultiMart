import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import ApiError from "./utils/ApiError";
import bodyParser from "body-parser"
dotenv.config()

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
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.urlencoded());

// import route
import userRoute from "./routes/user.route";
import shopRoute from "./routes/shop.route"

app.use("/api/v1/user", userRoute);
app.use("/api/v1/shop", shopRoute);

export default app;
