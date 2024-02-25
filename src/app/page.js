"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { Alert, Button, Snackbar } from "@mui/material";
import WebcamCapture from "@/components/WebcamCapture";
import * as faceapi from "face-api.js";

export default function App() {
  const [isFaceVisible, setIsFaceVisible] = useState(false);
  const [startCapture, setStartCapture] = useState(false);
  const [snackbarDetails, setSnackbarDetails] = useState({});
  const router = useRouter();

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
      setIsFaceVisible(true);
    };
    loadModels();
  }, []);

  const detectFace = async (videoEl) => {
    const detections = await faceapi
      .detectSingleFace(videoEl, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (detections) {
      const landmarks = detections.landmarks;
      if (landmarks && landmarks.getJawOutline().length > 0) {
        router.push("/success?detected=true");
      } else {
        renderSnackBar("Facial traits not clearly visible");
      }
    } else {
      renderSnackBar("Unable to detect the face");
    }
  };

  const renderSnackBar = (message) => {
    setSnackbarDetails({
      open: true,
      message: message,
    });
  };

  return (
    <div className={styles.main}>
      {!startCapture ? (
        <>
          <h1 className={styles.mainHeading}>
            Click the button below to start validation using facial
            identification
          </h1>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setStartCapture(true)}
            className={styles.getStartedButton}
          >
            Get started
          </Button>
        </>
      ) : (
        <div>
          {isFaceVisible ? (
            <WebcamCapture
              onCapture={detectFace}
              onClose={() => setStartCapture(false)}
            />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
      <Snackbar
        open={snackbarDetails.open}
        onClose={() => setSnackbarDetails({ ...snackbarDetails, open: false })}
        autoHideDuration={3000}
        message={snackbarDetails.message}
      />
    </div>
  );
}
