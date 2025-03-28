const bcrypt = require("bcryptjs");
const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

app.post("/signup", (req, res) => {
  console.log("sign up end point reached");
  try {
    console.log("request body: ", req.body);
    return res.json({
      message: `You tried to log in with the username: ${req.body.username}`,
    });
  } catch (error) {}
});

app.listen(PORT, () => {
  console.log(`server is listening on port: ${PORT}`);
});
