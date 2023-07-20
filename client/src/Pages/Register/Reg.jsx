import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Import NavLink from react-router-dom
import log from "../../assets/log.svg";
import reg from "../../assets/register.svg";
import "./style.css";
import { useAuth } from "../../context/AuthProvider";
import axios from "axios";

const Reg = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "student",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8090/api/auth/register",
        formData
      );
      if (response?.status === 201) {
        setFormData({
          name: "",
          email: "",
          role: "student",
          password: "",
        });
        setMessage(response.data.msg);
      }
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
  };

  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [formDataLog, setFormDataLog] = useState({
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");

  const handleChangeLog = (e) => {
    const { name, value } = e.target;
    setFormDataLog((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitLog = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8090/api/auth/login",
        formDataLog
      );
      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        if (res?.data?.user?.role === "teacher") {
          navigate("/teacher/home");
        } else if (res?.data?.user?.role === "student") {
          navigate("/student/home");
        }
      }
    } catch (error) {
      setMsg("An error occurred. Please try again.");
    }
  };

  return (
    <div className="containerReg">
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleSubmitLog} className="sign-in-form">
            {msg && (
              <p
                className="message"
                style={{ fontSize: "1.5rem", color: "green" }}
              >
                {msg}
              </p>
            )}
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user" />
              <input
                type="email"
                name="email"
                value={formDataLog.email}
                onChange={handleChangeLog}
                placeholder="E-mail"
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock" />
              <input
                type="password"
                name="password"
                value={formDataLog.password}
                onChange={handleChangeLog}
                placeholder="Password"
              />
            </div>
            <input type="submit" defaultValue="Login" className="btn solid" />
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <NavLink to="#" className="social-icon">
                <i className="fab fa-facebook-f" />
              </NavLink>
              <NavLink to="#" className="social-icon">
                <i className="fab fa-twitter" />
              </NavLink>
              <NavLink to="#" className="social-icon">
                <i className="fab fa-google" />
              </NavLink>
              <NavLink to="#" className="social-icon">
                <i className="fab fa-linkedin-in" />
              </NavLink>
            </div>
          </form>
          <form onSubmit={handleSubmit} className="sign-up-form">
            {message && (
              <p
                className="message"
                style={{ fontSize: "1.5rem", color: "green" }}
              >
                {message}
              </p>
            )}
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Username"
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="input-field"
              style={{
                border: "none",
              }}
            >
              <option
                value="student"
                style={{
                  fontSize: "1rem",
                  color: "#444",
                }}
              >
                Student
              </option>
              <option
                value="teacher"
                style={{ fontSize: "1rem", color: "#444" }}
              >
                Teacher
              </option>
            </select>
            <div className="input-field">
              <i className="fas fa-lock" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </div>
            <input type="submit" className="btn" defaultValue="Sign up" />
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <NavLink to="#" className="social-icon">
                <i className="fab fa-facebook-f" />
              </NavLink>
              <NavLink to="#" className="social-icon">
                <i className="fab fa-twitter" />
              </NavLink>
              <NavLink to="#" className="social-icon">
                <i className="fab fa-google" />
              </NavLink>
              <NavLink to="#" className="social-icon">
                <i className="fab fa-linkedin-in" />
              </NavLink>
            </div>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button
              to="#"
              className="btn transparent"
              id="sign-up-btn"
              onClick={() =>
                document
                  .querySelector(".containerReg")
                  .classList.add("sign-up-mode")
              }
              style={{
                position: "relative",
                top: "80px",
                textAlign: "center",
              }}
            >
              Sign up
            </button>
          </div>
          <img src={log} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button
              to="#"
              className="btn transparent"
              id="sign-in-btn"
              style={{
                position: "relative",
                top: "80px",
              }}
              onClick={() =>
                document
                  .querySelector(".containerReg")
                  .classList.remove("sign-up-mode")
              }
            >
              Sign in
            </button>
          </div>
          <img src={reg} className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Reg;
