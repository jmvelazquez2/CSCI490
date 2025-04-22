
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; // FontAwesome arrow

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("ocr_history") || "[]");
    setHistory(stored);
  }, []);
  const clearHistory = () => {
    localStorage.removeItem("ocr_history");
    setHistory([]);
  };
  return (

    <div style={{ padding: "20px", textAlign: "center", position: "relative" }}>
      <button
        onClick={() => navigate("/")}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          background: "none",
          border: "none",
          fontSize: "1.5rem",
          cursor: "pointer"
        }}
      >
        <FaArrowLeft />
      </button>
      <h2>Translation History</h2>
      <button
        onClick={clearHistory}
        style={{
          margin: "10px 0 20px",
          padding: "8px 16px",
          backgroundColor: "#dc3545",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "0.95rem"
        }}
      >
        Clear History
      </button>

      {history.length === 0 && <p>No previous entries found.</p>}

      {history.map((item, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            margin: "20px auto",
            padding: "16px",
            maxWidth: "600px",
            background: "#f9f9f9",
            textAlign: "left"
          }}
        >
          <p style={{ fontSize: "0.85rem", color: "#666" }}>
            📅 {new Date(item.timestamp).toLocaleString()}
          </p>

          <img
            src={item.image}
            alt={`Uploaded ${index}`}
            style={{
              maxWidth: "100%",
              borderRadius: "8px",
              marginBottom: "10px",
              border: "1px solid #ccc"
            }}
          />

          <h4>📝 Extracted Text:</h4>
          <p style={{ whiteSpace: "pre-wrap" }}>{item.text}</p>

          <h4>🌍 Translated Text:</h4>
          <p style={{ whiteSpace: "pre-wrap", backgroundColor: "#e6f4ea", padding: "10px", borderRadius: "6px" }}>
            {item.translation}
          </p>
        </div>
      ))}
    </div>
  );
};

export default HistoryPage;
