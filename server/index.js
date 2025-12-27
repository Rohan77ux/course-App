import express, { json } from "express";
const app = express();

import courseRoutes from "./Routes/Course";
import profileRoutes from "./Routes/Profile";
import userRoutes from "./Routes/User";
import paymentsRoutes from "./Routes/Payments";
import contactUsRoute from "./Routes/Contact";
import dotenv from "dotenv";
dotenv.config();
import { Connect } from "./config/database";
import cookieParser from "cookie-parser";
import cors from "cors";
import { cloudinaryConnect } from "./config/cloudinary";
import fileUpload from "express-fileupload";

const PORT = process.env.PORT || 3005;

Connect();

app.use(json());
app.use(cookieParser());

// Updated CORS configuration
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

cloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentsRoutes);
app.use("/api/v1/reach", contactUsRoute);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
