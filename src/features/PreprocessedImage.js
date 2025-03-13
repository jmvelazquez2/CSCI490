import React from "react";

const PreprocessedImage = ({ image, rotateImage, extractText }) => {
  return (
    <div>
      <h2>Preprocessed Image:</h2>
      <img src={image} alt="Processed" style={{ width: "100%", maxWidth: "400px",objectFit: "contain"  }} />
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => rotateImage(-90)}>🔄 Rotate Left</button>
        <button onClick={() => rotateImage(90)}>🔄 Rotate Right</button>
      </div>
      <button onClick={extractText} style={{ marginTop: "10px" }}>
        Extract Text
      </button>
    </div>
  );
};

export default PreprocessedImage;
