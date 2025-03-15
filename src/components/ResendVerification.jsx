import React, { useState } from "react";
import { resendVerificationEmail } from "../utils/axiosHelper"; // adjust the path as needed
import { toast } from "react-toastify";

const ResendVerification = ({ email }) => {
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    if (!email) {
      toast.error("Email is missing!");
      return;
    }

    setLoading(true);

    try {
      const res = await resendVerificationEmail(email);

      if (res.status === "success") {
        toast.success(res.message || "Verification email sent!");
      } else {
        toast.error(res.message || "Failed to send verification email.");
      }
    } catch (error) {
      console.error("Error resending verification:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleResend}
        disabled={loading}
        style={{
          backgroundColor: "#1F7CEC",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Sending..." : "Resend Verification Email"}
      </button>
    </div>
  );
};

export default ResendVerification;
