import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthProvider";
import Navbar from "./../../components/Navbar";

const Addcourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [videos, setVideos] = useState([]);
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("coverImage", coverImage);
      formData.append("price", price);

      videos.forEach((video) => {
        formData.append("videos", video);
      });

      const response = await axios.post(
        `http://localhost:8090/api/user/addCourse?authId=${auth?.user?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response?.status === 200) {
        alert("Course added Successfully");
        navigate("/teacher/courses");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const handleVideoChange = (e) => {
    const videoFiles = Array.from(e.target.files);
    setVideos([...videos, ...videoFiles]);
  };

  return (
    <Sidebar>
      <Navbar />
      <form
        onSubmit={handleSubmit}
        style={{
          position: "relative",
          maxWidth: "500px",
          margin: "0 auto",
          padding: "1rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
          top: "70px",
        }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          ></textarea>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="coverImage">Cover Image:</label>
          <input
            type="file"
            id="coverImage"
            onChange={(e) => setCoverImage(e.target.files[0])}
            required
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="videos">Videos:</label>
          <input
            type="file"
            id="videos"
            onChange={handleVideoChange}
            multiple
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Course
        </button>
      </form>
    </Sidebar>
  );
};

export default Addcourse;
