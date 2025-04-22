import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../features/ImageUploader";
import ImageCropper from "../features/ImageCropper";
import { translateText } from "../tool/translate";
import { spellCheckWithLanguageTool } from "../tool/spell";
import { cleanExtractedText } from "../tool/onlyText";
import { decodeHtmlEntities } from "../tool/decode";

function MainPage() {
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [language, setLanguage] = useState(() => {
        // Load from localStorage, or default to "es"
        return localStorage.getItem("preferred_language") || "es";
    });
    const [rotation, setRotation] = useState(0);
    const [cropping, setCropping] = useState(false);
    const [loading, setLoading] = useState(false);
    const canvasRef = useRef(null);
    const navigate = useNavigate();

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

            canvas.toBlob((blob) => {
                if (blob) {
                    const file = new File([blob], "rotated.png", { type: "image/png" });
                    setImageFile(file);

                    const blobUrl = URL.createObjectURL(blob);
                    setImage(blobUrl); // will still work in <img src={...} />

                } else {
                    console.error("❌ canvas.toBlob() failed");
                }
            }, "image/png");



        };

    };


    const base64ToFile = (base64Data, filename) => {
        const arr = base64Data.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) u8arr[n] = bstr.charCodeAt(n);
        return new File([u8arr], filename, { type: mime });
    };

    const extractText = async () => {
        if (!imageFile) return;
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', imageFile);
            const response = await fetch('https://api.ocr.space/parse/image', {
                method: 'POST',
                headers: { 'apikey': process.env.REACT_APP_OCR_API_KEY },
                body: formData,
            });
            const result = await response.json();
            let rawText = result.ParsedResults?.[0]?.ParsedText || "";
            const cleanedText = cleanExtractedText(rawText);
            const correctedText = await spellCheckWithLanguageTool(cleanedText);
            const translated = await translateText(correctedText, language);
            // Save to history
            const historyItem = {
                image: image, // base64 or blob URL
                text: correctedText,
                translation: decodeHtmlEntities(translated),
                timestamp: Date.now()
            };

            const prev = JSON.parse(localStorage.getItem("ocr_history") || "[]");
            localStorage.setItem("ocr_history", JSON.stringify([historyItem, ...prev]));


            localStorage.setItem("ocr_image", image);
            localStorage.setItem("ocr_text", correctedText);
            localStorage.setItem("ocr_translation", decodeHtmlEntities(translated));
            navigate("/results");
        } catch (err) {
            console.error("Processing error:", err);
        }
        setLoading(false);
    };

    const toolButtonStyle = {
        padding: "10px 16px",
        fontSize: ".75rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f1f1f1",
        cursor: "pointer",
        minWidth: "80px"
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <div style={{
                border: "2px solid #1e90ff", borderRadius: "12px", padding: "10px 20px",
                marginBottom: "20px", fontSize: "1.5rem", fontWeight: "bold",
                backgroundColor: "#f9f9f9", display: "block"
            }}>
                Ducir
            </div>
            <p style={{
                fontSize: ".9rem", color: "#000", marginTop: "10px",
                marginBottom: "25px", fontWeight: "bold"
            }}>
                Translate text from any image
            </p>
            <button
                onClick={() => navigate("/history")}
                style={{
                    marginBottom: "20px",
                    padding: "10px 20px",
                    backgroundColor: "#f1f1f1",
                    color: "#1e90ff",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "1rem"
                }}
            >
                📜 View History
            </button>
            <canvas ref={canvasRef} style={{ display: "none" }} />

            <ImageUploader setImage={setImage} setImageFile={setImageFile} />

            {image && !cropping && (
                <>
                    <img src={image} alt="Uploaded" style={{
                        marginTop: "20px", width: "100%",
                        border: "2px solid lightgrey", maxWidth: "400px"
                    }} />
                    <div style={{
                        display: "flex", justifyContent: "center",
                        flexWrap: "wrap", marginTop: "10px"
                    }}>
                        <button style={toolButtonStyle} onClick={() => setCropping(true)}>✂️ Crop</button>
                        <button style={toolButtonStyle} onClick={() => rotateImage(-90)}>🔄 Rotate Left</button>
                        <button style={toolButtonStyle} onClick={() => rotateImage(90)}>🔃 Rotate Right</button>
                    </div>

                    <div style={{ marginTop: "10px" }}>
                        <label htmlFor="detectedLanguage">Original:</label>
                        <select id="detectedLanguage" value="en" disabled style={{
                            marginLeft: "10px", padding: "6px", borderRadius: "6px",
                            fontSize: "1rem", backgroundColor: "#f1f1f1", color: "#000",
                            border: "1px solid #ccc"
                        }}>
                            <option value="en">English</option>
                        </select>
                    </div>

                    <div style={{ margin: "10px 0" }}>
                        <label htmlFor="languageSelect">Translate:</label>
                        <select id="languageSelect" value={language}
                            onChange={(e) => {
                                const lang = e.target.value;
                                setLanguage(lang);
                                localStorage.setItem("preferred_language", lang); // ✅ save it
                            }}

                            style={{
                                marginLeft: "10px", padding: "6px", borderRadius: "6px",
                                fontSize: "1rem", backgroundColor: "#f1f1f1", color: "#000",
                                border: "1px solid #ccc"
                            }}>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                            <option value="zh-CN">Chinese (Simplified)</option>
                            <option value="ja">Japanese</option>
                            <option value="hi">Hindi</option>
                            <option value="ar">Arabic</option>
                        </select>
                    </div>

                    <button style={toolButtonStyle} onClick={extractText}>
                        Extract Text & Translate
                    </button>
                </>
            )}

            {cropping && (
                <div>
                    <ImageCropper
                        image={image}
                        onCropDone={(croppedImg) => {
                            setImage(croppedImg);
                            const croppedFile = base64ToFile(croppedImg, "cropped.png");
                            setImageFile(croppedFile);
                            setCropping(false);
                        }}
                    />

                    <button
                        onClick={() => setCropping(false)}
                        style={{
                            marginTop: "10px",
                            padding: "8px 16px",
                            fontSize: "0.9rem",
                            borderRadius: "6px",
                            backgroundColor: "#ff4d4d",
                            color: "#fff",
                            border: "none",
                            cursor: "pointer"
                        }}
                    >
                        Cancel Crop
                    </button>
                </div>
            )}

            {loading && <p>Please wait...</p>}
        </div>
    );
}

export default MainPage;
