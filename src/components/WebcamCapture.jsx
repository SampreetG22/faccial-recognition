import React, { useRef } from "react";
import Webcam from "react-webcam";
import { Button } from "@mui/material";
import "./WebcamCapture.css";

const WebcamCapture = ({ onCapture, onClose }) => {
  const webcamRef = useRef(null);

  const handleCapture = async () => {
    const webcam = webcamRef.current;
    if (webcam && webcam.video) {
      const videoEl = webcam.video;
      onCapture(videoEl);
    }
  };

  return (
    <div className="webCamContainer">
      Position yourself in front of the camera
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          width: 600,
          height: 350,
          facingMode: "user",
        }}
        className="webcam"
      />
      <div className="buttonContainer">
        <Button
          variant="contained"
          color="primary"
          onClick={handleCapture}
          className="validateAndClose"
        >
          Validate
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onClose}
          className="validateAndClose"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default WebcamCapture;
