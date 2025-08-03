import { useState, useEffect } from "react";
import Header from "./components/Header";
import QuestionForm from "./components/QuestionForm";
import AnswerBox from "./components/AnswerBox";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import axios from "axios";
import "./App.css";

function App() {
  const [answer, setAnswer] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios.get("https://llm-feedback-backend.onrender.com/feedback").then((res) => setFeedbacks(res.data));
  }, []);

  const addFeedback = (newFeedback) => {
    setFeedbacks([...feedbacks, newFeedback]);
  };

  return (
    <div className="app-container">
      <Header />

      {/* AI Section as One Card */}
      <div className="ai-card">
        <QuestionForm setAnswer={setAnswer} />
        <AnswerBox answer={answer} />
      </div>

      {/* Feedback Section (Two Halves) */}
      <div className="feedback-section">
        <div className="half">
          <FeedbackForm onFeedbackAdded={addFeedback} />
        </div>
        <div className="half">
          <FeedbackList feedbacks={feedbacks} setFeedbacks={setFeedbacks} />
        </div>
      </div>
    </div>
  );
}

export default App;
