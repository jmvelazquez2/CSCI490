import React from "react";

const ImageUploader = ({ setImage, setImageFile }) => {
    const compressImage = (file, maxWidth = 800, maxHeight = 800, quality = 0.7) => {
        return new Promise((resolve) => {
            const img = new Image();
            const reader = new FileReader();

            reader.onload = (event) => {
                img.src = event.target.result;
            };

            img.onload = () => {
                const canvas = document.createElement("canvas");
                let width = img.width;
                let height = img.height;

                // Resize maintaining aspect ratio
                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);

                // Convert to a compressed blob
                canvas.toBlob((blob) => {
                    const compressedFile = new File([blob], file.name, {
                        type: "image/jpeg",
                        lastModified: Date.now(),
                    });

                    resolve({ file: compressedFile, preview: canvas.toDataURL("image/jpeg", quality) });
                }, "image/jpeg", quality);
            };

            reader.readAsDataURL(file);
        });
    };

    const handleCapture = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const { file: compressedFile, preview } = await compressImage(file);
            setImageFile(compressedFile);
            setImage(preview);
        }
    };

    return (
        <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleCapture}
            style={{ display: "block", margin: "10px auto" }}
        />
    );
};

export default ImageUploader;
