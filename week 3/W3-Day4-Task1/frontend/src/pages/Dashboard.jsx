import { Box, Grid, Paper, Typography } from "@mui/material";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

// Icons
import FolderIcon from "@mui/icons-material/Folder";
import GroupIcon from "@mui/icons-material/Group";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const STAT_CONFIGS = [
  {
    title: "Total Projects",
    icon:  <FolderIcon sx={{ fontSize: 32 }} />,
    color: "#4F8EF7",
    glow:  "rgba(79,142,247,0.3)",
    bg:    "rgba(79,142,247,0.1)",
    key:   "total",
  },
  {
    title: "Team Members",
    icon:  <GroupIcon sx={{ fontSize: 32 }} />,
    color: "#A78BFA",
    glow:  "rgba(167,139,250,0.3)",
    bg:    "rgba(167,139,250,0.1)",
    key:   "members",
  },
  {
    title: "Active Projects",
    icon:  <AutorenewIcon sx={{ fontSize: 32 }} />,
    color: "#34D399",
    glow:  "rgba(52,211,153,0.3)",
    bg:    "rgba(52,211,153,0.1)",
    key:   "active",
  },
  {
    title: "Completed",
    icon:  <CheckCircleIcon sx={{ fontSize: 32 }} />,
    color: "#FBBF24",
    glow:  "rgba(251,191,36,0.3)",
    bg:    "rgba(251,191,36,0.1)",
    key:   "completed",
  },
];

// ✅ Count-up animation helper
const animateCount = (el, target) => {
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration: 2,
    ease: "power2.out",
    onUpdate: () => {
      if (el) el.textContent = Math.round(obj.val);
    },
  });
};

const Dashboard = () => {
  const cardsRef    = useRef([]);
  const titleRef    = useRef(null);
  const subtitleRef = useRef(null);
  const badgeRef    = useRef(null);
  const countRefs   = useRef([]);

  const [stats, setStats] = useState({
    total: 0, members: 0, active: 0, completed: 0,
  });

  // ✅ Fetch real data
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectsRes, membersRes] = await Promise.all([
          api.get("/projects"),
          api.get("/members"),
        ]);
        const projects = projectsRes.data;
        const members  = membersRes.data;
        setStats({
          total:     projects.length,
          members:   members.length,
          active:    projects.filter((p) => p.status === "Active").length,
          completed: projects.filter((p) => p.status === "Completed").length,
        });
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      }
    };
    fetchStats();
  }, []);

  // ✅ Hero animation
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(badgeRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    ).fromTo(titleRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.2"
    ).fromTo(subtitleRef.current,
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      "-=0.3"
    );
  }, []);

  // ✅ Cards + count-up after stats load
  useEffect(() => {
    if (!stats.total && !stats.members) return;

    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        stagger: 0.12, duration: 0.6, ease: "power2.out",
      }
    );

    const values = [stats.total, stats.members, stats.active, stats.completed];
    countRefs.current.forEach((el, i) => animateCount(el, values[i]));
  }, [stats]);

  return (
    <Box display="flex" sx={{ minHeight: "100vh", bgcolor: "#0F1117" }}>
      <Navbar />

      <Box sx={{ marginLeft: "250px", flexGrow: 1, p: 4 }}>

        {/* ✅ Hero Section */}
        <Box sx={{
          mb: 4, p: 5, borderRadius: 4,
          background: "linear-gradient(135deg, #1A1D2E 0%, #12152A 100%)",
          border: "1px solid rgba(79,142,247,0.15)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""', position: "absolute",
            top: -80, right: -80,
            width: 280, height: 280,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(79,142,247,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          },
          "&::after": {
            content: '""', position: "absolute",
            bottom: -60, left: "25%",
            width: 200, height: 200,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          },
        }}>

          {/* ✅ Badge */}
          <Box
            ref={badgeRef}
            display="inline-flex"
            alignItems="center"
            gap={0.8}
            sx={{
              mb: 2, px: 2, py: 0.6,
              borderRadius: 10,
              background: "rgba(79,142,247,0.12)",
              border: "1px solid rgba(79,142,247,0.25)",
            }}
          >
            <TrendingUpIcon sx={{ fontSize: 14, color: "#4F8EF7" }} />
            <Typography variant="caption" sx={{ color: "#4F8EF7", fontWeight: 600 }}>
              Overview Dashboard
            </Typography>
          </Box>

          <Typography
            ref={titleRef}
            variant="h3"
            fontWeight={700}
            color="text.primary"
            sx={{ lineHeight: 1.2, mb: 1 }}
          >
            Welcome back to Portal
          </Typography>

          <Typography
            ref={subtitleRef}
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 480 }}
          >
            Here's a snapshot of your team's progress. Stay on top of your
            projects and keep the momentum going.
          </Typography>
        </Box>

        {/* ✅ Section Label */}
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ letterSpacing: 2, mb: 2, display: "block" }}
        >
          Key Metrics
        </Typography>

        {/* ✅ Stats Grid */}
        <Grid container spacing={3}>
          {STAT_CONFIGS.map(({ title, icon, color, glow, bg, key }, index) => (
            <Grid
              item xs={12} sm={6} md={3} key={key}
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  background: "#1A1D2E",
                  border: "1px solid rgba(255,255,255,0.06)",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "default",
                  minHeight: 180,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    border: `1px solid ${color}40`,
                    transform: "translateY(-6px)",
                    boxShadow: `0 16px 40px ${glow}`,
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0, left: 0, right: 0,
                    height: 2,
                    background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  },
                  "&:hover::after": { opacity: 1 },
                }}
              >
                {/* ✅ Top row — title + icon */}
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontWeight={500}
                    fontSize="0.85rem"
                  >
                    {title}
                  </Typography>

                  <Box sx={{
                    width: 44, height: 44,
                    borderRadius: 2,
                    background: bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color,
                    border: `1px solid ${color}30`,
                    flexShrink: 0,
                  }}>
                    {icon}
                  </Box>
                </Box>

                {/* ✅ Count-up number */}
                <Typography
                  variant="h2"
                  fontWeight={700}
                  sx={{ color, lineHeight: 1, mt: 2 }}
                  ref={(el) => (countRefs.current[index] = el)}
                >
                  0
                </Typography>

                {/* ✅ Bottom caption */}
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {key === "members"   ? "people in team"      :
                   key === "active"    ? "currently running"   :
                   key === "completed" ? "successfully finished":
                                        "all time"}
                </Typography>

              </Paper>
            </Grid>
          ))}
        </Grid>

      </Box>
    </Box>
  );
};

export default Dashboard;