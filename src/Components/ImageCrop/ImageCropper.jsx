import React, { useState } from "react";
import Cropper from "react-easy-crop";

// Reusable Cropper Component
const ImageCropper = ({ image, onCropDone, onCropCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleCropComplete = (croppedArea, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      {/* Cropper UI */}
      <div
        style={{
          position: "relative",
          width: "300px",
          height: "300px",
          background: "#fff",
        }}
      >
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1} // 1:1 square
          cropShape="round" // circular crop
          showGrid={false}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
        />
      </div>

      {/* Controls */}
      <div style={{ marginTop: "20px" }}>
        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e) => setZoom(e.target.value)}
        />
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", marginTop: "20px", flexDirection: "row", gap: "30px" }}>
        <button
          onClick={() => onCropDone(croppedAreaPixels)}
          style={{ marginRight: "10px", backgroundColor: "#d75f0f", padding: "10px 30px", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "500", cursor: "pointer" }}
        >
          Done
        </button>
        <button
          onClick={onCropCancel}
          style={{ marginRight: "10px", backgroundColor: "#d75f0f", padding: "10px 25px", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "500", cursor: "pointer" }}
        >
          Cancel</button>
      </div>
    </div>
  );
};

export default ImageCropper;
