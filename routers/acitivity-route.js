const express = require("express");
const router = express.Router();
const { activity, getActivity } = require("../controllers/activity-controller");

router.post("/activity/:id", activity);
router.get("/activity/:userId", getActivity);
module.exports = router;
