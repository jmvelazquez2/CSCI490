import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; // FontAwesome arrow

const ResultsPage = () => {
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setImage(localStorage.getItem("ocr_image") || "");
    setText(localStorage.getItem("ocr_text") || "");
    setTranslatedText(localStorage.getItem("ocr_translation") || "");
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px", position: "relative", paddingLeft: "20px"}}>
        
        <div style={{
          width: "100%",
          backgroundColor: "#1e90ff",
          padding: "2px 20px",
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#fff",
          textAlign: "left",
          position: "fixed",
          display:"flex",
          flexDirection:"column",
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

      {/*Spacer*/}
      <div style={{ marginTop: "50px" }} />
      {/*BackButton */}
      <button
        onClick={() => navigate("/")}
        style={{
          paddingRight: "20px",
          marginBottom: "10px",
          position: "absolute",
          top: "72px",
          left: "0px",
          background: "none",
          border: "none",
          fontSize: "1.5rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}
      >
        <FaArrowLeft />
       
      </button>

      <h2>Uploaded Image</h2>
      {image && (
        <img
          src={image}
          alt="Uploaded"
          style={{
            maxWidth: "40%",
            border: "1px solid #ccc",
            borderRadius: "10px"
          }}
        />
      )}

      <h2 style={{ paddingRight: "160px",marginTop: "20px" }}>📝 Extracted Text</h2>
      <div
        style={{
          
          background: "#f4f4f4",
          padding: "12px",
          borderRadius: "8px",
          textAlign: "left",
          maxWidth: "600px",
          margin: "0 auto"
        }}
      >
        {text}
      </div>

      <h2 style={{paddingRight: "150px", marginTop: "20px" }}>🌍 Translated Text</h2>
      <div
        style={{
          background: "#d4edda",
          padding: "12px",
          borderRadius: "8px",
          textAlign: "left",
          maxWidth: "600px",
          margin: "0 auto"
        }}
      >
        {translatedText}
      </div>
    </div>
  );
};

export default ResultsPage;
