const CourseModel = require("../models/courseModel");
const quizModel = require("../models/quizModel");

exports.getallcourses = async (req, res) => {
  try {
    const courses = await CourseModel.find({})
      .populate("authorId")
      .sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: `Internal Server Error` });
  }
};

exports.getSingle = async (req, res) => {
  try {
    const courses = await CourseModel.find({});
    const studCourse = courses.filter((obj) =>
      obj.enrol.includes(req.params.id)
    );
    return res.status(200).send({
      success: true,
      courses: studCourse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server error" });
  }
};

exports.getQuiz = async (req, res) => {
  try {
    const quiz = await quizModel.findOne({ courseId: req.params.id });
    if (!quiz) {
      return res.status(299).send({ msg: "Quiz is not available" });
    }
    return res.status(200).json({
      success: true,
      quiz,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      msg: "Internal server error",
      error,
    });
  }
};

exports.updateQuizStudent = async (req, res) => {
  try {
    const { studentId, score } = req.body;
    const quiz = await quizModel.findById(req.params.id);
    const exist = quiz.students.find((obj) => {
      return obj.student.toString() === studentId.toString();
    });
    if (exist) {
      exist.score = Number(score);
    } else {
      quiz.students.push({ student: studentId, score: Number(score) });
    }
    await quiz.save();
    return res
      .status(200)
      .json({ success: true, msg: "Quiz updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error " });
  }
};

exports.updateEnroll = async (req, res) => {
  try {
    await CourseModel.updateOne(
      { _id: req.params.id },
      { $push: { enrol: req.query.studId } }
    );
    res.status(200).send({ success: true, msg: "Enrol Update Done" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal Server error " });
  }
};

exports.getSingleCourse = async (req, res) => {
  try {
    const course = await CourseModel.findById(req.params.id).populate(
      "authorId"
    );
    if (!course) {
      return res.status(404).send({ msg: "Course not found" });
    }
    return res.status(200).json(course);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "internal server error" });
  }
};
