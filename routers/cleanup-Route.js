const express = require("express");
const router = express.Router();
const { deleteUsersWithoutNames } = require("../controllers/user-controller");
const { deleteUserById } = require("../controllers/user-controller");

router.delete("/users/cleanup", deleteUsersWithoutNames);

router.delete("/students/:id", deleteUserById);

module.exports = router;
