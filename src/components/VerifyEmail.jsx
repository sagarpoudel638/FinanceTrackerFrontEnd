import React, { useEffect, useState } from "react";
import { verifyEmail } from "../utils/axiosHelper";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyEmail = () => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verify = async () => {
      const urlParams = new URLSearchParams(location.search);
      const token = urlParams.get("token");

      if (!token) {
        setStatus("failed");
        setLoading(false);
        toast.error("Invalid verification link");

        setTimeout(() => navigate("/login"), 3000);
        return;
      }

      try {
        await verifyEmail(token);
        setStatus("success");
        toast.success("Email verified successfully!");
      } catch (error) {
        console.error(error);
        setStatus("failed");
        toast.error(
          error?.response?.data?.message || "Verification failed"
        );
      } finally {
        setLoading(false);
        setTimeout(() => navigate("/login"), 3000);
      }
    };

    verify();
  }, [navigate, location.search]);

  if (loading) {
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>Verifying your email...</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {status === "success" ? (
        <>
          <h2 style={styles.success}>✅ Email Verified!</h2>
          <p style={styles.info}>Redirecting to login...</p>
        </>
      ) : (
        <>
          <h2 style={styles.error}>❌ Verification Failed</h2>
          <p style={styles.info}>Redirecting to login...</p>
        </>
      )}
    </div>
  );
};