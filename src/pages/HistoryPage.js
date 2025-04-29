
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

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
      {/*This is the Title Bar INSIDE the return */}
      <div style={{
        width: "100%",
        backgroundColor: "#1e90ff",
        padding: "2px 20px",
        fontSize: "1.5rem",
        fontWeight: "bold",
        color: "#fff",
        textAlign: "left",
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        top: 0,
        left: 0,
        zIndex: 999
      }}>
        <span>Ducir</span>
        <span style={{
          fontSize: "0.75rem",
          fontWeight: "normal",
          fontStyle: "italic",
          opacity: 0.8
        }}>
          by Jesus Velazquez
        </span>
      </div>

      {/*Spacer to push content down below header */}
      <div style={{ marginTop: "50px" }} />
      <button
        onClick={() => navigate("/")}
        style={{
          position: "absolute",
          top: "72px",
          left: "10px",
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
          display: "flex",
          flexDirection: "column",   
          alignItems: "center",       
          justifyContent: "center",
          margin: "20px auto",       
          padding: "10px 16px",
          width: "220px",            
          backgroundColor: "#dc3545",
          color: "#fff",
          border: "1px solid #ccc",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "1.2rem",
          textAlign: "center",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)"  
        }}
      >
         Clear History
        <span style={{
          fontSize: "0.8rem",
          fontWeight: "normal",
          marginTop: "4px",
          opacity: 0.85,
          color: "#f8d7da"
        }}>
          Delete all saved translations
        </span>
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
