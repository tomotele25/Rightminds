require("dotenv").config();
const express = require("express");
const PORT = 5000;
const connectToDb = require("./database/db");
const authRoutes = require("./routers/auth-routes");
const cors = require("cors");
connectToDb();

const app = express();
app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",
  "https://rightminds.vercel.com",
  "https://rightminds-academy-kx9k.vercel.app",
];

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

app.listen(PORT, () => {
  console.log(`server is listening on port: ${PORT}`);
});
