import { useState } from "react";
import axios from "axios";

export default function QuestionForm({ setAnswer }) {
  const [question, setQuestion] = useState("");

  const containerStyle = {
    marginTop: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const inputStyle = {
    padding: "10px",
    width: "300px",
    border: "1px solid #555",
    borderRadius: "5px",
    fontSize: "16px",
    backgroundColor: "#2a2a3d",
    color: "white",
    outline: "none",
  };

  const buttonStyle = {
    marginTop: "10px",
    padding: "10px 15px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background 0.3s",
  };

  const handleAsk = async () => {
    if (!question.trim()) return;

    try {
      const res = await axios.post("http://localhost:5000/ask", { question });
      setAnswer(res.data.answer);
    } catch {
      setAnswer("Error fetching answer");
    }
  };

  return (
    <div style={containerStyle}>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask me anything..."
        style={inputStyle}
      />
      <button
        onClick={handleAsk}
        style={buttonStyle}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#2563eb")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#3b82f6")}
      >
        Ask
      </button>
    </div>
  );
}
