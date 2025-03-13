import React from "react";

const ExtractedText = ({ text, translatedText }) => {
  return (
    <div>
      <h2>Extracted Text:</h2>
      <p style={{ whiteSpace: "pre-wrap", background: "#f4f4f4", padding: "10px" }}>
        {text}
      </p>

      {translatedText && (
        <>
          <h2>Translated Text:</h2>
          <p style={{ whiteSpace: "pre-wrap", background: "#d4edda", padding: "10px" }}>
            {translatedText}
          </p>
        </>
      )}
    </div>
  );
};

export default ExtractedText;
