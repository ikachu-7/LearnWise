const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  CourseController,
  getAllteacherCourse,
  removeCourse,
  updateCourse,
  addQuiz,
  analyticHandler,
} = require("../controllers/courseController");
const { checkForAuth, checkForteacher } = require("../middleware/authMiddle");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const originalName = file.originalname;
    const encodedName = encodeURIComponent(originalName);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName = uniqueSuffix + "-" + encodedName;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/addCourse",
  upload.fields([{ name: "coverImage" }, { name: "videos" }]),
  CourseController
);

router.get("/getSingleTeacherAllCourses/:id", getAllteacherCourse);
router.get("/teacher", checkForAuth, checkForteacher, (req, res) => {
  res.status(200).send({ ok: true });
});

router.delete("/removeCourse/:id", removeCourse);

router.put(
  "/updateCourse/:id",
  upload.fields([{ name: "coverImage" }]),
  updateCourse
);
router.post("/addQuiz/:id", addQuiz);

router.get("/analytics/:id", analyticHandler);
module.exports = router;
