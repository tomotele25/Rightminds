const Activity = require("../models/activity");
const User = require("../models/user");

const activity = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.body;

    if (!date) {
      return res
        .status(400)
        .json({ success: false, message: "Date is required" });
    }

    // Check if activity already exists for that date
    const existing = await Activity.findOne({ userId: id, date });

    if (existing) {
      return res
        .status(200)
        .json({ success: true, message: "Already tracked for this date" });
    }

    // If not, create a new entry
    const newActivity = new Activity({
      userId: id,
      date,
    });

    await newActivity.save();

    res
      .status(200)
      .json({ success: true, message: "Activity tracked for today" });
  } catch (error) {
    console.error("Activity tracking error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getActivity = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const activities = await Activity.find({ userId });
    const allDates = activities.map((a) => a.date);
    const uniqueDates = [...new Set(allDates)];

    // get last 30 days
    const today = new Date();
    const last30Days = [];
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      last30Days.push(d.toISOString().split("T")[0]);
    }

    const activeDates = last30Days.filter((date) => uniqueDates.includes(date));

    // Calculate streak (most recent consecutive days)
    let streak = 0;
    for (let i = 0; i < 30; i++) {
      const day = new Date();
      day.setDate(day.getDate() - i);
      const dateStr = day.toISOString().split("T")[0];

      if (activeDates.includes(dateStr)) {
        streak++;
      } else {
        break;
      }
    }

    // Assign badge based on streak
    let badge = "";
    if (streak >= 30) badge = "🔥 30-Day Streak";
    else if (streak >= 7) badge = "🔥 7-Day Streak";
    else if (streak >= 1) badge = "🔥 1-Day Streak";

    // Save badge to user
    await User.findByIdAndUpdate(userId, { badge });

    res.status(200).json({
      success: true,
      activeDates,
      streak,
      badge,
    });
  } catch (err) {
    console.error("Error in getActivity:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { activity, getActivity };
