import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      // In a real app, this sends a reset email
      await resetPassword({ email });
      setStatus("success");
      setMessage("Password reset instructions have been sent to your email.");
    } catch (err) {
      setStatus("error");
      setMessage(err.message || "Failed to request password reset. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Forgot Password</h2>
        <p style={styles.subtitle}>Enter your email to receive reset instructions</p>
        
        {status === "error" && <div style={styles.error}>{message}</div>}
        {status === "success" && <div style={styles.success}>{message}</div>}
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
              disabled={status === "success"}
            />
          </div>
          
          <button 
            type="submit" 
            style={styles.button} 
            disabled={status === "loading" || status === "success"}
          >
            {status === "loading" ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        
        <p style={styles.footer}>
          Remember your password? <Link to="/login" style={styles.link}>Log in</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
    padding: "20px",
    backgroundColor: "#f4f7f6"
  },
  card: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
    width: "100%",
    maxWidth: "400px"
  },
  title: {
    margin: "0 0 10px",
    fontSize: "24px",
    fontWeight: "600",
    color: "#333",
    textAlign: "center"
  },
  subtitle: {
    margin: "0 0 25px",
    color: "#666",
    textAlign: "center",
    fontSize: "14px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#444"
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "16px",
    outline: "none",
    transition: "border-color 0.2s"
  },
  button: {
    backgroundColor: "#0066cc",
    color: "white",
    border: "none",
    padding: "14px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s"
  },
  link: {
    color: "#0066cc",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500"
  },
  footer: {
    marginTop: "25px",
    textAlign: "center",
    fontSize: "14px",
    color: "#666"
  },
  error: {
    backgroundColor: "#ffebee",
    color: "#c62828",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "20px",
    fontSize: "14px",
    textAlign: "center"
  },
  success: {
    backgroundColor: "#e8f5e9",
    color: "#2e7d32",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "20px",
    fontSize: "14px",
    textAlign: "center"
  }
};
