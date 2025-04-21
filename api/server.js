require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 5001;
const connectToDb = require("../database/db");
const authRoutes = require("../routers/auth-routes");
const cors = require("cors");
const usernameROute = require("../routers/userRoute");
const startServer = async () => {
  connectToDb();
  app.listen(PORT, () => {
    console.log(`app is running on port : ${PORT}`);
  });
};

const allowedOrigins = [
  "http://localhost:3000",
  "https://rightminds.vercel.com",
  "https://rightminds-academy-kx9k.vercel.app",
];

app.use(express.json());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Origin is not allowed"));
      }
    },
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);

startServer();
module.exports = app;
