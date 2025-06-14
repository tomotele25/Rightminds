require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 5001;
const connectToDb = require("../database/db");
const authRoutes = require("../routers/auth-routes");
const studentRoutes = require("../routers/student-route");
const teacherRoutes = require("../routers/teachers-route");
const cleanupRoute = require("../routers/cleanup-Route");
const anouncementRoute = require("../routers/anouncement-routes");
const createCourseRoute = require("../routers/course");
const createQuizRoute = require("../routers/quiz");
const levelRoute = require("../routers/level-route");
const departmentRoute = require("../routers/department-route");
const activityRoute = require("../routers/acitivity-route");
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
app.use("/api", anouncementRoute);
app.use("/api", createCourseRoute);
app.use("/api", createQuizRoute);
app.use("/api", departmentRoute);
app.use("/api", levelRoute);
app.use("/api", activityRoute);
app.use("/uploads", express.static("uploads"));
app.get("/", (req, res) => {
  console.log("test reached");
  res.send("Hello world!");
});
// app.post("/api/uploadFile", (req, res) => {
//   res.send("upload successful");
// });

startServer();
module.exports = app;
