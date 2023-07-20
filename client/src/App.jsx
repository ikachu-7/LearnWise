import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Reg from "./Pages/Register/Reg";
import Addcourse from "./Pages/Addcourse/Addcourse";
import ViewCourse from "./Pages/ViewCourse/ViewCourse";
import TeacherRoutes from "./Routes/TeacherRoutes";
import EmailVerify from "./Pages/EmailVerify/EmailVerify";
import Quiz from "./Pages/Quiz/Quiz";
import Logout from "./components/Logout";
import Analytics from "./Pages/Analytics/Analytics";
import Profile from "./Pages/Profile/Profile";
import StudentRoutes from "./Routes/StudentRoutes";
import CourseforStud from "./Pages/CoursesforStud/CourseforStud";
import ViewStudCourse from "./Pages/Studcourse/ViewStudCourse";
import StudQuiz from "./Pages/StudQuiz/StudQuiz";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/student" element={<StudentRoutes />}>
          <Route path="home" element={<Home />} />
          <Route path="courses" element={<CourseforStud />} />
          <Route path="viewCourse/:id" element={<ViewStudCourse />} />
          <Route path="quiz/:id" element={<StudQuiz />} />
        </Route>
        <Route path="/" element={<Reg />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/verify/:id" element={<EmailVerify />} />
        <Route path="/teacher" element={<TeacherRoutes />}>
          <Route path="create" element={<Addcourse />} />
          <Route path="courses" element={<ViewCourse />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="home" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
