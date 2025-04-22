import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../tool/cropImage";
import Slider from "@mui/material/Slider";

const ImageCropper = ({ image, onCropDone }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const cropImage = async () => {
    const croppedImage = await getCroppedImg(image, croppedAreaPixels);
    onCropDone(croppedImage);
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 400,
          background: "#333",
          zIndex: 10,
          overflow: "hidden",
        }}
      >
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
  
      {/* Controls go below the cropper */}
      <div style={{ marginTop: 20, textAlign: "center" }}>
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          onChange={(e, zoom) => setZoom(zoom)}
          style={{ width: 200, marginBottom: 10 }}
        />
        <br />
        <button onClick={cropImage} style={{ padding: "8px 16px" }}>
          ✂️ Crop Image
        </button>
      </div>
    </>
  );
  
};

export default ImageCropper;