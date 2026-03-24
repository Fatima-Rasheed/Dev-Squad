import React, { useState, useRef, useEffect } from "react";
import {
  Box, TextField, Button, Typography,
  CircularProgress, Paper, Divider
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { gsap } from "gsap";
import api, { setToken } from "../services/api";

const Login = () => {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const navigate    = useNavigate();
  const formRef     = useRef(null);
  const titleRef    = useRef(null);
  const emailRef    = useRef(null);
  const passwordRef = useRef(null);
  const buttonRef   = useRef(null);

  // ✅ Staggered field animations on mount
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(titleRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    )
    .fromTo(
      [emailRef.current, passwordRef.current, buttonRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.15, ease: "power2.out" },
      "-=0.2"
    );
  }, []);

  // ✅ Validation
  const validate = () => {
    if (!email.trim())    return "Email is required";
    if (!password.trim()) return "Password is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email format";
    return "";
  };

  const handleLogin = async () => {
    const validationError = validate();
    if (validationError) return setError(validationError);

    setLoading(true);
    setError("");
    try {
      const res = await api.post(" https://week3-day4backend.vercel.app/api/auth/login", { email, password });
      setToken(res.data.token);
      navigate("/dashboard"); // ✅ correct redirect
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");

      // ✅ Shake animation on error
      gsap.fromTo(
        formRef.current,
        { x: -10 },
        { x: 0, duration: 0.4, ease: "elastic.out(1, 0.3)",
          keyframes: { x: [-10, 10, -8, 8, -4, 4, 0] }
        }
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Submit on Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
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
        sx={{ width: 380, p: 5, borderRadius: 4 }}
      >
        {/* ✅ Branding */}
        <Typography
          ref={titleRef}
          variant="h4"
          align="center"
          fontWeight={700}
          color="primary"
          gutterBottom
        >
          🚀 TeamPortal
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Sign in to your account
        </Typography>

        {/* ✅ Error display */}
        {error && (
          <Typography
            color="error" variant="body2"
            align="center" sx={{ mb: 2 }}
          >
            {error}
          </Typography>
        )}

        {/* ✅ Fields with individual refs for stagger */}
        <Box ref={emailRef}>
          <TextField
            label="Email" type="email"
            value={email} fullWidth sx={{ mb: 2 }}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            onKeyDown={handleKeyDown}
          />
        </Box>

        <Box ref={passwordRef}>
          <TextField
            label="Password" type="password"
            value={password} fullWidth sx={{ mb: 3 }}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            onKeyDown={handleKeyDown}
          />
        </Box>

        <Box ref={buttonRef}>
          <Button
            variant="contained" fullWidth
            size="large" onClick={handleLogin}
            disabled={loading}
            startIcon={loading && <CircularProgress size={18} color="inherit" />}
            sx={{ borderRadius: 2, py: 1.2 }}
          >
            {loading ? "Signing in..." : "Login"}
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* ✅ Link to signup */}
        <Typography variant="body2" align="center" color="text.secondary">
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{ color: "#1976d2", fontWeight: 600, textDecoration: "none" }}
          >
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;