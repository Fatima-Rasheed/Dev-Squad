import React, { useState, useRef, useEffect } from "react";
import {
  Box, TextField, Button, Typography,
  CircularProgress, Paper, Divider, Alert
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { gsap } from "gsap";
import api from "../services/api";

const Signup = () => {
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [success,  setSuccess]  = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const navigate     = useNavigate();
  const formRef      = useRef(null);
  const titleRef     = useRef(null);
  const nameRef      = useRef(null);
  const emailRef     = useRef(null);
  const passwordRef  = useRef(null);
  const buttonRef    = useRef(null);

  // ✅ Staggered field animations — matches Login style
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(titleRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    ).fromTo(
      [nameRef.current, emailRef.current, passwordRef.current, buttonRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.12, ease: "power2.out" },
      "-=0.2"
    );
  }, []);

  // ✅ Validation
  const validate = () => {
    if (!name.trim())    return "Name is required";
    if (!email.trim())   return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email format";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const handleSignup = async () => {
    const validationError = validate();
    if (validationError) return setError(validationError);

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.post("https://backend-ten-green-77.vercel.app/api/auth/register", { name, email, password });
      setSuccess("Account created! Redirecting to login...");

      // ✅ Clear form
      setName(""); setEmail(""); setPassword("");

      // ✅ Auto-redirect after short delay
      setTimeout(() => navigate("/login"), 2000);

    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");

      // ✅ Shake on error
      gsap.fromTo(
        formRef.current,
        { x: -10 },
        {
          x: 0, duration: 0.4, ease: "elastic.out(1, 0.3)",
          keyframes: { x: [-10, 10, -8, 8, -4, 4, 0] },
        }
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Submit on Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSignup();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)",
      }}
    >
      <Paper
        ref={formRef}
        elevation={8}
        sx={{ width: 400, p: 5, borderRadius: 4 }}
      >
        {/* ✅ Branding — matches Login */}
        <Typography
          ref={titleRef}
          variant="h4" align="center"
          fontWeight={700} color="primary" gutterBottom
        >
          🚀 TeamPortal
        </Typography>
        <Typography
          variant="body2" align="center"
          color="text.secondary" sx={{ mb: 3 }}
        >
          Create your account
        </Typography>

        {/* ✅ Feedback alerts */}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        )}

        {/* ✅ Fields with individual refs for stagger */}
        <Box ref={nameRef}>
          <TextField
            label="Full Name" value={name} fullWidth
            sx={{ mb: 2 }} onKeyDown={handleKeyDown}
            onChange={(e) => { setName(e.target.value); setError(""); }}
          />
        </Box>

        <Box ref={emailRef}>
          <TextField
            label="Email" type="email" value={email} fullWidth
            sx={{ mb: 2 }} onKeyDown={handleKeyDown}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
          />
        </Box>

        <Box ref={passwordRef}>
          <TextField
            label="Password" type="password" value={password} fullWidth
            sx={{ mb: 3 }} onKeyDown={handleKeyDown}
            helperText="Minimum 6 characters"
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
          />
        </Box>

        <Box ref={buttonRef}>
          <Button
            variant="contained" fullWidth size="large"
            onClick={handleSignup} disabled={loading}
            startIcon={loading && <CircularProgress size={18} color="inherit" />}
            sx={{ borderRadius: 2, py: 1.2 }}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* ✅ Link back to login */}
        <Typography variant="body2" align="center" color="text.secondary">
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ color: "#1976d2", fontWeight: 600, textDecoration: "none" }}
          >
            Sign in
          </Link>
        </Typography>

      </Paper>
    </Box>
  );
};

export default Signup;