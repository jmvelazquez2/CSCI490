import React from "react";

const boxStyle = {
  borderRadius: "10px",
  padding: "12px 16px",
  marginBottom: "20px",
  textAlign: "left",
  fontSize: "1rem",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const ExtractedText = ({ text, translatedText }) => {
  return (
    <div style={{ marginTop: "30px", padding: "0 12px" }}>
      {text && (
        <div style={{ ...boxStyle, backgroundColor: "#f9f9f9" }}>
          <h3 style={{ marginTop: 0, fontWeight: "bold" }}>📝 Extracted Text</h3>
          <p>{text}</p>
        </div>
      )}

      {translatedText && (
        <div style={{ ...boxStyle, backgroundColor: "#e6f4ea" }}>
          <h3 style={{ marginTop: 0, fontWeight: "bold" }}>🌍 Translated Text</h3>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default ExtractedText;
