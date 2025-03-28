const mongoose = require("mongoose");

const connectToDb = async () => {
  mongoose
    .connect(
      "mongodb+srv://jiraya:jiraya12345@cluster0.f3w7a.mongodb.net/rightminds"
    )
    .then(() => {
      console.log("MongoDb connected successfully");
    })
    .catch((err) => {
      console.error("connection failed");
    });
};

module.exports = connectToDb;
