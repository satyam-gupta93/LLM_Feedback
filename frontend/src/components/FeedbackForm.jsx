import { useState } from "react";
import axios from "axios";

export default function FeedbackForm({ onFeedbackAdded }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!name || !message) return alert("Enter all fields");
    try {
      const res = await axios.post("http://localhost:5000/feedback", { name, message });
      onFeedbackAdded(res.data);
      setName("");
      setMessage("");
    } catch {
      alert("Error adding feedback");
    }
  };

  return (
    <div className="feedback-form">
      <h3>📝 Add Feedback</h3>
      <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
      <textarea placeholder="Your Feedback" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
