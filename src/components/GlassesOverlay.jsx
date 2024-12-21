import React from "react";
import { GLASSES_STYLES } from "../constants/glasses";

export function GlassesOverlay({ videoRef, landmarks, glassesType }) {
  if (!landmarks) return null;

  const calculateGlassesPositionAndRotation = () => {
    // Extract eye landmarks
    const leftEye = landmarks[33]; // Left eye landmark
    const rightEye = landmarks[263]; // Right eye landmark

    const videoWidth = videoRef.current.videoWidth || 640;
    const videoHeight = videoRef.current.videoHeight || 480;

    // Calculate center position
    const centerX = ((leftEye.x + rightEye.x) / 2) * videoWidth;
    const centerY = ((leftEye.y + rightEye.y) / 2) * videoHeight;

    // Calculate glasses width
    const glassesWidth = Math.abs(rightEye.x - leftEye.x) * videoWidth * 1.5; // Adjust scale

    // Calculate rotation angle (in degrees)
    const deltaX = (rightEye.x - leftEye.x) * videoWidth;
    const deltaY = (rightEye.y - leftEye.y) * videoHeight;
    const rotationAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI); // Convert radians to degrees

    return {
      top: `${centerY}px`,
      left: `${centerX}px`,
      width: `${glassesWidth}px`,
      rotation: rotationAngle,
    };
  };

  const glassesStyle = GLASSES_STYLES[glassesType];
  const glassesPosition = calculateGlassesPositionAndRotation();

  return (
    <img
      src={glassesStyle.imageUrl}
      alt={glassesStyle.name}
      className="absolute opacity-80 transform -translate-x-1/2 -translate-y-1/2"
      style={{
        top: glassesPosition.top,
        left: glassesPosition.left,
        width: glassesPosition.width,
        transform: `translate(-50%, -50%) rotate(${glassesPosition.rotation}deg)`,
      }}
    />
  );
}
