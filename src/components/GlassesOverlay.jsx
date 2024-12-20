import React from "react";
import { GLASSES_STYLES } from "../constants/glasses";

export function GlassesOverlay({ videoRef, landmarks, glassesType }) {
  if (!landmarks) return null;

  const calculateGlassesPosition = () => {
    // Extract eye landmarks
    const leftEye = landmarks[33]; // Left eye landmark
    const rightEye = landmarks[263]; // Right eye landmark

    const videoWidth = videoRef.current.videoWidth || 640;
    const videoHeight = videoRef.current.videoHeight || 480;

    const centerX = ((leftEye.x + rightEye.x) / 2) * videoWidth;
    const centerY = ((leftEye.y + rightEye.y) / 2) * videoHeight;
    const glassesWidth = Math.abs(rightEye.x - leftEye.x) * videoWidth * 1.5; // Adjust scale

    return {
      top: `${centerY}px`,
      left: `${centerX}px`,
      width: `${glassesWidth}px`,
    };
  };

  const glassesStyle = GLASSES_STYLES[glassesType];
  const glassesPosition = calculateGlassesPosition();

  return (
    <img
      src={glassesStyle.imageUrl}
      alt={glassesStyle.name}
      className="absolute opacity-80 transform -translate-x-1/2 -translate-y-1/2"
      style={{
        top: glassesPosition.top,
        left: glassesPosition.left,
        width: glassesPosition.width,
      }}
    />
  );
}
