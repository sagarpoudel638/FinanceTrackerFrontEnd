import React from "react";
import ResendVerification from "../components/ResendVerification"; // Update path as needed
import { useParams } from "react-router-dom";

const VerifyEmailPage = () => {
  const userEmail = localStorage.getItem("userEmail"); // Make sure you save email when user signs up or logs in!

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Email Verification</h1>
        <p style={styles.description}>
          A verification link has been sent to your email: <strong>{userEmail || "unknown@example.com"}</strong>
        </p>
        <p style={styles.info}>Please check your email and click on the verification link to activate your account.</p>

        <div style={{ marginTop: "20px" }}>
          <ResendVerification email={userEmail} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    padding: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px 30px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "500px",
    textAlign: "center",
  },
  title: {
    fontSize: "28px",
    marginBottom: "10px",
    color: "#333",
  },
  description: {
    fontSize: "16px",
    color: "#555",
  },
  info: {
    fontSize: "14px",
    color: "#777",
    marginTop: "10px",
  },
};

export default VerifyEmailPage;
