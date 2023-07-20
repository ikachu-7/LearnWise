import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const ViewCourse = () => {
  const [arr, setArr] = useState(null);
  const [auth, setAuth] = useAuth();
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getCourse = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8090/api/user/getSingleTeacherAllCourses/${auth?.user?._id}`
        );

        if (res?.status === 200) {
          setArr(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (auth?.token) getCourse();
  }, []);

  const openPopup = (id) => {
    setId(id);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("coverImage", coverImage);
      const res = await axios.put(
        `http://localhost:8090/api/user/updateCourse/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res && res.status === 200) {
        alert("Course Updated Successfully");
        window.location.replace("/teacher/courses");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8090/api/user/removeCourse/${id}`
      );
      if (res?.status === 200) {
        alert("Course deleted Successfully");
        window.location.replace("/teacher/courses");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Sidebar>
      <Navbar />
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>SrNo.</th>
            <th style={tableHeaderStyle}>Title</th>
            <th style={tableHeaderStyle}>Price</th>
            <th style={tableHeaderStyle}>Image</th>
            <th style={tableHeaderStyle}>Enrollment</th>
            <th style={tableHeaderStyle}>Edit</th>
            <th style={tableHeaderStyle}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {arr &&
            arr.courses.map((obj, index) => (
              <tr key={obj._id}>
                <td style={tableCellStyle}>{index + 1}.</td>
                <td style={tableCellStyle}>{obj.title}</td>
                <td style={tableCellStyle}>{obj.price}</td>
                <td style={tableCellStyle}>
                  <img
                    src={`http://localhost:8090/uploads/${obj.coverImage.filename}`}
                    alt=""
                    style={tableImageStyle}
                  />
                </td>
                <td style={tableCellStyle}>{obj.enrol.length}</td>
                <td style={tableCellStyle}>
                  <button
                    style={editButtonStyle}
                    onClick={() => openPopup(obj._id)}
                  >
                    Edit
                  </button>
                </td>
                <td style={tableCellStyle}>
                  <button
                    style={deleteButtonStyle}
                    onClick={() => handleDelete(obj._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* Popup/Modal */}
      {showPopup && id && (
        <div style={popupOverlayStyle}>
          <div style={popupContentStyle}>
            <h2 style={popupTitleStyle}>Update Course</h2>
            <form onSubmit={handleSubmit}>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Price:</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Image:</label>
                <input
                  type="file"
                  onChange={(e) => setCoverImage(e.target.files[0])}
                  style={inputStyle}
                />
              </div>
              <div style={buttonContainerStyle}>
                <button type="submit" style={submitButtonStyle}>
                  Update
                </button>
                <button onClick={closePopup} style={cancelButtonStyle}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Sidebar>
  );
};

// Styles
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  margin: "0 auto",
};

const tableHeaderStyle = {
  padding: "10px",
  backgroundColor: "#f2f2f2",
  borderBottom: "1px solid #ddd",
  textAlign: "left",
  fontWeight: "bold",
  fontSize: "20px",
};

const tableCellStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
  fontSize: "20px",
};

const tableImageStyle = {
  width: "150px",
  height: "auto",
  maxWidth: "100%",
};

const editButtonStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "20px",
};

const deleteButtonStyle = {
  backgroundColor: "#f44336",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "20px",
};

const popupOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const popupContentStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "4px",
  maxWidth: "500px",
};

const popupTitleStyle = {
  textAlign: "center",
  marginBottom: "20px",
  fontSize: "18px",
};

const formGroupStyle = {
  marginBottom: "15px",
};

const labelStyle = {
  display: "block",
  marginBottom: "5px",
  fontSize: "14px",
  fontWeight: "bold",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  fontSize: "14px",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

const buttonContainerStyle = {
  marginTop: "20px",
  display: "flex",
  justifyContent: "center",
};

const submitButtonStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
  marginRight: "10px",
};

const cancelButtonStyle = {
  backgroundColor: "#f44336",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
};

export default ViewCourse;
