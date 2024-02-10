import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();


app.use(
    cors({
      origin: process.env.CROSS_ORIGIN,
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

  app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());


export default app;
