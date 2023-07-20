const CourseModel = require("../models/courseModel");
const quizModel = require("../models/quizModel");
exports.CourseController = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const { filename, path } = req.files["coverImage"][0];
    const videos = req.files["videos"];
    const course = new CourseModel({
      title,
      description,
      price: Number(price),
      coverImage: {
        filename,
        path,
      },
      videos: videos.map((video) => {
        return {
          filename: video.filename,
          path: video.path,
        };
      }),
      authorId: req.query.authId,
    });

    await course.save();
    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.getAllteacherCourse = async (req, res) => {
  try {
    const courses = await CourseModel.find({ authorId: req.params.id });
    if (!courses) {
      return res.status(400).json({ msg: "Teacher doesn't exist" });
    }
    return res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "internal Server Error" });
  }
};

exports.removeCourse = async (req, res) => {
  try {
    await CourseModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ success: true, msg: "Course deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { title, price } = req.body;
    const { filename, path } = req.files["coverImage"]
      ? req.files["coverImage"][0]
      : {};
    const course = await CourseModel.findById(req.params.id);
    if (!course) {
      return res.status(400).send({ msg: "Course is not available" });
    }
    if (title) {
      course.title = title;
    }
    if (price) {
      course.price = Number(price);
    }
    if (filename && path) {
      course.coverImage = {
        filename: filename,
        path: path,
      };
    }
    await course.save();
    return res.status(200).json({
      success: true,
      msg: "Course Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal Server error" });
  }
};

exports.addQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, options, answer } = req.body;

    const course = await CourseModel.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const newQuestion = {
      question,
      options,
      answer: Number(answer),
    };
    // Add the question to the quiz
    const quiz = await quizModel.findOneAndUpdate(
      { courseId: id },
      { $push: { questions: newQuestion } },
      { new: true }
    );

    if (!quiz) {
      // If the quiz doesn't exist, create a new quiz
      const newQuiz = new quizModel({
        courseId: id,
        questions: [newQuestion],
      });

      await newQuiz.save();
    }

    res
      .status(200)
      .json({ message: "Question added successfully to the quiz" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
};

exports.analyticHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const courses = await CourseModel.find({ authorId: id });
    const totalCourses = courses.length;
    const totalEnroll = courses.reduce((total, obj) => {
      return total + obj.enrol.length;
    }, 0);
    const totalProfit = courses.reduce((total, obj) => {
      return total + obj.price * obj.enrol.length;
    }, 0);
    const arr = [];
    for (let i = 0; i < courses.length; i++) {
      const obj = {
        title: courses[i].title,
        totalProfitFromThis: courses[i].enrol.length * courses[i].price,
        totalVideos: courses[i].videos.length,
        img: courses[i].coverImage.filename,
      };
      arr.push(obj);
    }
    return res.status(200).json({
      success: true,
      totalCourses,
      totalEnroll,
      totalProfit,
      Analytic: arr,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ mag: "Internal server error " });
  }
};
