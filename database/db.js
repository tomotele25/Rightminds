require("dotenv").config();

const mongoose = require("mongoose");

const connectToDb = async () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("MongoDb connected successfully");
    })
    .catch((err) => {
      console.error("connection failed");
    });
};

module.exports = connectToDb;
