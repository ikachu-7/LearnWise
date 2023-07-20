const express = require("express");
const router = express.Router();
const {
  getSingle,
  getallcourses,
  getQuiz,
  updateQuizStudent,
  updateEnroll,
  getSingleCourse,
} = require("../controllers/studentController");
const { checkForAuth, checkForstudent } = require("../middleware/authMiddle");

router.get("/getAllstudentCourse/:id", getSingle);
router.get("/allcourses", getallcourses);
router.get("/getQuiz/:id", getQuiz);
router.put("/updateQuizStudent/:id", updateQuizStudent);
router.put("/updateEnroll/:id", updateEnroll);
router.get("/getSingleCourse/:id", getSingleCourse);
router.get("/student", checkForAuth, checkForstudent, (req, res) => {
  res.status(200).send({ ok: true });
});
router.get("/test", getSingle);

module.exports = router;
