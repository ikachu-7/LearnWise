import React, { useEffect, useState } from "react";
import SidebarStud from "../../components/SidebarStud";
import Navbar from "./../../components/Navbar";
import { useAuth } from "../../context/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CourseforStud = () => {
  const [arr, setArr] = useState([]);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const getCorsesforStud = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8090/api/v1/getAllstudentCourse/${auth?.user?._id}`
        );
        if (data) {
          setArr(data?.courses);
        }
      } catch (error) {
        console.log(error);
        alert("Something went wrong");
      }
    };
    if (auth?.user) getCorsesforStud();
  }, []);
  return (
    <SidebarStud>
      <Navbar />
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        style={{ position: "relative", top: "100px", left: "100px" }}
      >
        {arr?.map((obj, index) => (
          <div
            className="bg-white border shadow mx-auto max-w-xs sm:max-w-none sm:mx-0 sm:w-full px-4 py-6 sm:px-6 sm:py-8 lg:max-w-xs lg:px-8 lg:py-10"
            key={index}
          >
            <div className="group relative bg-gray-200 rounded-lg shadow">
              <img
                src={`http://localhost:8090/uploads/${obj.coverImage.filename}`}
                alt="Course cover image"
                className="w-full h-full object-cover object-center rounded-lg"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-900">{obj.title}</h3>
              <div className="mt-2">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                  onClick={() => navigate(`/student/viewCourse/${obj._id}`)}
                >
                  Start
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SidebarStud>
  );
};

export default CourseforStud;
