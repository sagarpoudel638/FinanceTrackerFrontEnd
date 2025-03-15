import React, { useEffect, useState } from "react";
import { verifyEmail } from "../utils/axiosHelper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(""); // success | failed
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (!token) {
        setStatus("failed");
        toast.error("Invalid verification link");
        return;
      }

      try {
        console.log(token)
        await verifyEmail(token);
        setStatus("success");
        toast.success("Email verified successfully!");
      } catch (error) {
        console.error(error);
        setStatus("failed");
        toast.error("Verification failed");
      } finally {
        setLoading(false);

        // Wait 3 seconds before navigating to login
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    };

    verify();
  }, [navigate]);

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

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },
  title: {
    fontSize: "24px",
    color: "#333",
  },
  success: {
    fontSize: "24px",
    color: "#28a745",
  },
  error: {
    fontSize: "24px",
    color: "#dc3545",
  },
  info: {
    fontSize: "16px",
    color: "#555",
    marginTop: "10px",
  },
};

export default VerifyEmail;
