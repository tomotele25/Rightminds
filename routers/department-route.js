const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/department-controller");
router.get("/departments", departmentController.getDepartments);
router.post("/departments", departmentController.createDepartment);

module.exports = router;
