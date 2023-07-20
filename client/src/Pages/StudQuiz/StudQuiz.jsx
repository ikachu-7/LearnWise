import React, { useEffect, useState } from "react";
import SidebarStud from "../../components/SidebarStud";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./quiz.css";
const StudQuiz = () => {
  const [ques, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 10 minutes in seconds
  const [flag, setflag] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8090/api/v1/getQuiz/${id}`
        );
        if (res?.status === 200) {
          const { data } = res;
          setQuiz(data);
        }
      } catch (error) {
        console.log(error);
        alert("Something went wrong");
      }
    };
    fetchQuiz();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(timer);
      // Handle time up logic here
    }

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedOption("");
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    setSelectedOption("");
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleAnswerSubmit = () => {
    const currentQuestion = ques?.quiz?.questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
      setScore((prevScore) => prevScore + 1);
    }
    handleNextQuestion();
  };

  if (!ques) {
    return <div>Loading...</div>;
  }

  const currentQuestion = ques?.quiz?.questions[currentQuestionIndex];

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <SidebarStud>
      <Navbar />
      <div
        className="quiz-container"
        style={{ position: "relative", left: "20px", top: "100px" }}
      >
        <div className="timer">{formatTime(timeLeft)}</div>
        <div className="question">{currentQuestion?.question}</div>
        <div className="options">
          {currentQuestion?.options?.map((option, index) => (
            <div
              key={index}
              className={`option ${selectedOption === index ? "selected" : ""}`}
              onClick={() => handleOptionSelect(index)}
            >
              {option}
            </div>
          ))}
        </div>
        <div className="buttons">
          <button
            className="prev-button"
            disabled={currentQuestionIndex === 0}
            onClick={handlePrevQuestion}
          >
            Prev
          </button>
          <button
            className="next-button"
            disabled={currentQuestionIndex === ques?.quiz?.questions.length - 1}
            onClick={handleAnswerSubmit}
          >
            Next
          </button>
        </div>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          onClick={() => setflag(true)}
        >
          Submit
        </button>
      </div>
      {(timeLeft === 0 || flag) && (
        <div className="popup-container">
          <div className="popup">
            <h2>Thank you for Joining our course</h2>
            <p>Your test have been submitted</p>
            <p>
              Total Questions: {ques?.quiz?.questions.length} <br />
              Your Score : {score}
            </p>
            {ques?.quiz?.questions.length * (70 / 100) <= score ? (
              <p>
                Congrats, You passed the test.
                <br /> Will receive your certificate in a while.
              </p>
            ) : (
              <pre>Sorry, You failed.Try again</pre>
            )}
            <button onClick={() => navigate("/student/home")}>Close</button>
          </div>
        </div>
      )}
    </SidebarStud>
  );
};

export default StudQuiz;
