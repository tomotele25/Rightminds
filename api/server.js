require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 5001;
const connectToDb = require("../database/db");
const authRoutes = require("../routers/auth-routes");
const studentRoutes = require("../routers/student-route");
const teacherRoutes = require("../routers/teachers-route");
const cleanupRoute = require("../routers/cleanup-Route");
const cors = require("cors");
// const userRoute = require("../routers/userRoute");
const startServer = async () => {
  connectToDb();
  app.listen(PORT, () => {
    console.log(`app is running on port : ${PORT}`);
  });
};

const allowedOrigins = [
  "http://localhost:3000",
  "https://rightminds-academy-risy.vercel.app",
  "https://rightminds-academy-risy",
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
app.use("/api", studentRoutes);
app.use("/api", teacherRoutes);
app.use("/api", cleanupRoute);
app.get("/", (req, res) => {
  console.log("test reached");
  res.send("Hello world!");
});

startServer();
module.exports = app;
