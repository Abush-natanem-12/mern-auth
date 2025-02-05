import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";

// HACK: IMPORTING ROUTES HERE
import authRouter from "./routes/auth/auth.route.js";

// HACK: CREATING THE APP
const app = express();

// HACK: SETTING UP THE PORT
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

app.get("/", (req, res) => {
  res.send("Hello world this is not the first time when I call you");
});

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`server running on port ${PORT}`);
});
