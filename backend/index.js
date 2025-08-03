import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Store feedback in memory (no database)
let feedbacks = [];
let idCounter = 1;

// ROUTE 1: Ask AI a Question
app.post("/ask", async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: "Question is required" });

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const answer = response.data.choices[0].message.content;
    res.json({ answer });
  } catch (error) {
    console.error("Error fetching AI response:", error.message);
    res.status(500).json({ error: "Failed to get AI response" });
  }
});

// ROUTE 2: Add Feedback
app.post("/feedback", (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) return res.status(400).json({ error: "Name & message required" });

  const newFeedback = { id: idCounter++, name, message };
  feedbacks.push(newFeedback);
  res.json(newFeedback);
});

// ROUTE 3: Get All Feedback
app.get("/feedback", (req, res) => {
  res.json(feedbacks);
});

//  ROUTE 4: Delete Feedback
app.delete("/feedback/:id", (req, res) => {
  const id = parseInt(req.params.id);
  feedbacks = feedbacks.filter((fb) => fb.id !== id);
  res.json({ message: "Deleted Successfully" });
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
