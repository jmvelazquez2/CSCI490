import React, { useState, useRef } from "react";
import ImageUploader from "./features/ImageUploader";
import ExtractedText from "./features/ExtractedText";
import { translateText } from "./tool/translate";
import "./App.css";

function App() {
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [text, setText] = useState("");
    const [translatedText, setTranslatedText] = useState("");
    const [loading, setLoading] = useState(false);
    const [rotation, setRotation] = useState(0);
    const canvasRef = useRef(null);

    const rotateImage = (angle) => {
        setRotation((prevRotation) => prevRotation + angle);
        const img = new Image();
        img.src = image;
        img.onload = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            if (rotation % 180 === 0) {
                canvas.width = img.width;
                canvas.height = img.height;
            } else {
                canvas.width = img.height;
                canvas.height = img.width;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((rotation * Math.PI) / 180);
            ctx.drawImage(img, -img.width / 2, -img.height / 2);
            ctx.restore();

            const rotatedImage = canvas.toDataURL("image/png");
            setImage(rotatedImage);
        };
    };

    const extractText = async () => {
        if (!imageFile) return;
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', imageFile);

            const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.ocr.space/parse/image', {
                method: 'POST',
                headers: {
                    'apikey': 'K85745332888957',
                },
                body: formData,
            });

            const result = await response.json();
            const rawText = result.ParsedResults?.[0]?.ParsedText || "";
            setText(rawText);

            const translated = await translateText(rawText);
            setTranslatedText(translated);
        } catch (error) {
            console.error("OCR or Translation Error:", error);
        }
        setLoading(false);
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Extract Text from Image</h1>
            <ImageUploader 
                setImage={setImage} 
                setImageFile={setImageFile}
            />
            <canvas ref={canvasRef} style={{ display: "none" }} />
            {image && (
                <>
                    <img src={image} alt="Uploaded" style={{ width: "100%", maxWidth: "400px", objectFit: "contain" }} />
                    <div style={{ marginTop: "10px" }}>
                        <button onClick={() => rotateImage(-90)}>🔄 Rotate Left</button>
                        <button onClick={() => rotateImage(90)}>🔄 Rotate Right</button>
                    </div>
                    <button onClick={extractText} style={{ marginTop: "10px" }}>
                        Extract Text
                    </button>
                </>
            )}
            {loading && <p>Extracting text... Please wait.</p>}
            {text && <ExtractedText text={text} translatedText={translatedText} />}
        </div>
    );
}

export default App;
