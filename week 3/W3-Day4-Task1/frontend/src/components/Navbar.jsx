import { useRef, useEffect } from "react";
import {
  Drawer, List, ListItemButton, ListItemIcon,
  ListItemText, Typography, Box, Divider, Tooltip
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import FolderIcon from "@mui/icons-material/Folder";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";

const DRAWER_WIDTH = 250;

const navItems = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { label: "Team Members", icon: <GroupIcon />,  path: "/members"   },
  { label: "Projects",     icon: <FolderIcon />, path: "/projects"  },
];

const Navbar = () => {
  const location  = useLocation();
  const navigate  = useNavigate();
  const drawerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      drawerRef.current,
      { x: -DRAWER_WIDTH, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    );
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      PaperProps={{
        ref: drawerRef,
        sx: {
          width: DRAWER_WIDTH,
          background: "linear-gradient(180deg, #12152A 0%, #0F1117 100%)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "4px 0 24px rgba(0,0,0,0.4)",
        },
      }}
    >
      {/* Branding */}
      <Box sx={{ p: 3, pb: 2 }}>
        <Box display="flex" alignItems="center" gap={1.5}>
          <Box sx={{
            width: 38, height: 38, borderRadius: 2,
            background: "linear-gradient(135deg, #4F8EF7, #7C3AED)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, boxShadow: "0 4px 12px rgba(79,142,247,0.4)",
          }}>
            🚀
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={700} color="text.primary" lineHeight={1}>
              TeamPortal
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Management Suite
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mx: 2 }} />

      {/* Nav Items */}
      <List sx={{ mt: 1, flexGrow: 1, px: 1 }}>
        {navItems.map(({ label, icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <Tooltip title={label} placement="right" key={path}>
              <ListItemButton
                component={Link}
                to={path}
                sx={{
                  borderRadius: 2, mb: 0.5, py: 1.2,
                  background: isActive
                    ? "linear-gradient(135deg, rgba(79,142,247,0.2), rgba(124,58,237,0.2))"
                    : "transparent",
                  border: isActive
                    ? "1px solid rgba(79,142,247,0.3)"
                    : "1px solid transparent",
                  "&:hover": {
                    background: "rgba(79,142,247,0.1)",
                    border: "1px solid rgba(79,142,247,0.2)",
                  },
                  color: isActive ? "#4F8EF7" : "text.secondary",
                  transition: "all 0.2s ease",
                }}
              >
                <ListItemIcon sx={{
                  color: isActive ? "#4F8EF7" : "text.secondary",
                  minWidth: 36,
                }}>
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 700 : 400,
                    fontSize: "0.9rem",
                    color: isActive ? "#4F8EF7" : "inherit",
                  }}
                />
                {isActive && (
                  <Box sx={{
                    width: 4, height: 24, borderRadius: 2,
                    background: "linear-gradient(180deg, #4F8EF7, #7C3AED)",
                    ml: 1,
                  }} />
                )}
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mx: 2 }} />

      {/* Logout */}
      <List sx={{ px: 1, pb: 2 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2, color: "text.secondary",
            "&:hover": {
              background: "rgba(248,113,113,0.1)",
              color: "#F87171",
              "& .MuiListItemIcon-root": { color: "#F87171" },
            },
            transition: "all 0.2s ease",
          }}
        >
          <ListItemIcon sx={{ color: "inherit", minWidth: 36 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Navbar;