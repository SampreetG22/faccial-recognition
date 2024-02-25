"use client";
import { Button, Snackbar } from "@mui/material";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import "./page.css";

export default function Success() {
  const [success, setSuccess] = useState(false);
  const [snackBar, setSnackBar] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get("detected")) {
      setSuccess(true);
    } else {
      router.push("/");
    }
  }, []);
  return (
    <div className="successContainer">
      {success ? (
        <>
          <h1 className="homeHeading">
            Hello there. Welcome to <br />
            <h1>House of Couton Private Limited</h1>
          </h1>
          <p className="homeSubHeading">
            We run &apos;Feba&apos;, a proximity marketing platform to target
            customers present around retail stores to convert them for sales by
            enabling retailers to deliver nearby campaigns and lists of
            customers nearby, to engage with them through personalized
            campaigns.
          </p>
          <Link href="/">
            <Button
              color="primary"
              variant="contained"
              className="captureAgainButton"
            >
              Capture Again
            </Button>
          </Link>
          <Snackbar
            open={snackBar}
            onClose={() => setSnackBar(false)}
            autoHideDuration={3000}
            message="Facial recognition successful"
          />
        </>
      ) : null}
    </div>
  );
}
