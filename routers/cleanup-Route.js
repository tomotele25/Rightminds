const express = require("express");
const router = express.Router();
const { deleteUsersWithoutNames } = require("../controllers/auth-controllers");
const { deleteUserById } = require("../controllers/auth-controllers");

router.delete("/users/cleanup", deleteUsersWithoutNames);

router.delete("/students/:id", deleteUserById);

module.exports = router;
