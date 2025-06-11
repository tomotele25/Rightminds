const Quiz = require("../models/quiz");

const getStudentProgress = async (req, res) => {
  const studentId = req.params.studentId;

  try {
    const quizzes = await Quiz.find();

    const attemptedQuizzes = quizzes
      .map((quiz) => {
        const studentResults = quiz.results.filter(
          (r) => r.studentId.toString() === studentId
        );

        if (studentResults.length === 0) return null;

        const latestResult = studentResults.reduce((a, b) =>
          new Date(a.finishTime) > new Date(b.finishTime) ? a : b
        );

        return {
          quizId: quiz._id,
          title: quiz.title,
          course: quiz.course,
          department: quiz.department,
          status: "Completed",
          progress: 100,
          score: latestResult.score,
          finishTime: latestResult.finishTime,
        };
      })
      .filter(Boolean);

    res.status(200).json(attemptedQuizzes);
  } catch (error) {
    console.error("Progress error:", error);
    res.status(500).json({ message: "Error fetching student progress", error });
  }
};

module.exports = getStudentProgress;
