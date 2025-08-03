export default function AnswerBox({ answer }) {
  if (!answer) return null;

  const boxStyle = {
    marginTop: "20px",
    padding: "15px",
    width: "350px",
    backgroundColor: "#2a2a3d",
    border: "1px solid #444",
    borderRadius: "8px",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.4)",
    color: "white",
  };

  const titleStyle = {
    fontWeight: "bold",
    fontSize: "18px",
    marginBottom: "8px",
    color: "#60a5fa",
  };

  const textStyle = {
    fontSize: "16px",
    color: "#e5e7eb",
  };

  return (
    <div style={boxStyle}>
      <h2 style={titleStyle}>Answer:</h2>
      <p style={textStyle}>{answer}</p>
    </div>
  );
}
