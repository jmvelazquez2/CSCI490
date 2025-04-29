import React from "react";

const ImageUploader = ({ setImage, setImageFile }) => {
    const handleCapture = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
            <label style={{
                display: "flex",
                flexDirection: "column",       
                alignItems: "center",           
                justifyContent: "center",
                padding: "10px 16px",
                width: "220px",                
                border: "1px solid #ccc",
                backgroundColor: "#f1f1f1",
                color: "#1e90ff",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "1.2rem",
                textAlign: "center",
                margin: "0 auto"                
            }}>
                📷 Upload Image
                <span style={{
                    fontSize: "0.8rem",
                    fontWeight: "normal",
                    marginTop: "4px",
                    opacity: 0.8,
                    color: "#333"
                }}>
                    Choose a picture from gallery or camera
                </span>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleCapture}
                    style={{ display: "none" }}
                />
            </label>

        </div>
    );
};

export default ImageUploader;
