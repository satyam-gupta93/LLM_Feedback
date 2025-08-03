import axios from "axios";

export default function FeedbackList({ feedbacks, setFeedbacks }) {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/feedback/${id}`);
      setFeedbacks(feedbacks.filter((fb) => fb.id !== id));
    } catch {
      alert("Error deleting feedback");
    }
  };

  return (
    <div className="feedback-list">
      <h3>📋 Feedback List</h3>
      {feedbacks.length === 0 ? (
        <p>No feedback yet.</p>
      ) : (
        feedbacks.map((fb) => (
          <div key={fb.id} className="feedback-item">
            <p>
              <strong>{fb.name}</strong>: {fb.message}
            </p>
            <button onClick={() => handleDelete(fb.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}
