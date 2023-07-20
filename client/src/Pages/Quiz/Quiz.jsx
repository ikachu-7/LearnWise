import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Quiz = () => {
  const [arr, setArr] = useState(null);
  const [auth, setAuth] = useAuth();
  const [id, setId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);

  const handleOptionChange = (e, index) => {
    const updatedOptions = [...options];
    updatedOptions[index] = e.target.value;
    setOptions(updatedOptions);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8090/api/user/addQuiz/${id}`,
        {
          question,
          options,
          answer,
        }
      );
      if (res && res.status === 200) {
        alert("Question added successfully to the quiz");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <Sidebar>
      <Navbar />
      <div style={gridContainerStyle}>
        {arr &&
          arr.courses.map((obj, index) => (
            <div key={obj._id} style={gridItemStyle}>
              <h3>{obj.title}</h3>
              <img
                src={`http://localhost:8090/uploads/${obj.coverImage.filename}`}
                alt=""
                style={imageStyle}
              />
              <button
                style={addQuestionButtonStyle}
                onClick={() => openPopup(obj._id)}
              >
                Add Question
              </button>
            </div>
          ))}
      </div>
      {/* Popup/Modal */}
      {showPopup && id && (
        <div style={popupOverlayStyle}>
          <div style={popupContentStyle}>
            <h2 style={popupTitleStyle}>Add Question</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Question:</label>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Options:</label>
                {options.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(e, index)}
                    style={inputStyle}
                  />
                ))}
              </div>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Answer:</label>
                <select
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  style={selectStyle}
                >
                  <option value="">Select an option</option>
                  {options.map((option, index) => (
                    <option key={index} value={index}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div style={buttonContainerStyle}>
                <button type="submit" style={submitButtonStyle}>
                  Add Question
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
const gridContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "20px",
  padding: "20px",
};

const gridItemStyle = {
  border: "1px solid #ddd",
  padding: "20px",
  textAlign: "center",
};

const imageStyle = {
  width: "100%",
  height: "auto",
  maxWidth: "100%",
  marginBottom: "10px",
};

const addQuestionButtonStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "16px",
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
const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const formGroupStyle = {
  marginBottom: "15px",
  width: "100%",
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

const selectStyle = {
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
const popupTitleStyle = {
  textAlign: "center",
  marginBottom: "20px",
  fontSize: "18px",
};

export default Quiz;
