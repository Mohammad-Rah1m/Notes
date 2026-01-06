import { connectDB } from "./config/db.js";
import { rateLimitMiddleware } from "./middleware/rateLimiter.js";
import notesRoutes from "./routes/notesRoutes.js";
import dotenv from "dotenv";
// const express = require('express');
import express from "express";
// const port = 5000;
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
// console.log(process.env.MONGO_URI);
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
console.log(__dirname);
//middleware

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json()); //this will allow you to access req body
app.use(rateLimitMiddleware);

//simple example for middleware
app.use((req, res, next) => {
  console.log(`Req method ${req.method} and Req Url is ${req.url}`);
  next();
});

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // app.get(".*", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  // });

  //   app.get("/:path*", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  // });

  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
}
// app.use("/api/products",productRoutes);
// app.use("/api/posts",postsRoutes);

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is listening at http://localhost:${PORT}`);
//   });
// });

const startServer = async () => {
  try {
    // 1. Wait for DB connection
    await connectDB();
    console.log("Database connected successfully");

    // 2. Start the server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    // 3. If DB fails, log it and shut down
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit with failure code
  }
};

startServer();
