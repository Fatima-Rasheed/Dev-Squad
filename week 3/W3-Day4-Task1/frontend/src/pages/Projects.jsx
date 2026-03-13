import { useEffect, useState, useRef } from "react";
import {
  Box, Button, Typography,
  Alert, CircularProgress, Chip,
  Snackbar, IconButton, Tooltip
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { gsap } from "gsap";
import AddProjectDialog from "../components/AddProjectDialog";
import Navbar from "../components/Navbar";
import api from "../services/api";

// ✅ Status chip
const StatusChip = ({ status }) => (
  <Chip
    label={status}
    size="small"
    sx={{
      fontWeight: 600,
      borderRadius: 2,
      bgcolor: status === "Active"
        ? "rgba(52,211,153,0.15)"
        : "rgba(79,142,247,0.15)",
      color: status === "Active" ? "#34D399" : "#4F8EF7",
      border: `1px solid ${status === "Active"
        ? "rgba(52,211,153,0.3)"
        : "rgba(79,142,247,0.3)"}`,
    }}
  />
);

const Projects = () => {
  const [projects,    setProjects]    = useState([]);
  const [open,        setOpen]        = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState("");
  const [toast,       setToast]       = useState({ open: false, message: "" });

  const tableRef = useRef(null);
  const toastRef = useRef(null);

  const fetchProjects = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/projects");
      const formatted = res.data.map((p) => ({
        id:          p._id,
        title:       p.title,
        description: p.description || "—",
        status:      p.status,
        techStack:   p.techStack   || "—",
        teamMembers: p.teamMembers?.map((m) => m.name).join(", ") || "None",
        // ✅ Keep raw data for edit pre-fill
        raw:         p,
      }));
      setProjects(formatted);
    } catch (err) {
      setError("Failed to load projects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  // ✅ GSAP table entrance
  useEffect(() => {
    if (!loading && tableRef.current) {
      gsap.fromTo(
        tableRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [loading]);

  // ✅ GSAP toast
  const showToast = (message) => {
    setToast({ open: true, message });
    setTimeout(() => {
      if (toastRef.current) {
        gsap.fromTo(
          toastRef.current,
          { opacity: 0, y: 50, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
        );
      }
    }, 50);
  };

  const hideToast = () => setToast({ open: false, message: "" });

  // ✅ Delete handler
  const handleDelete = async (id) => {
    try {
      await api.delete(`/projects/${id}`);
      showToast("Project deleted successfully!");
      fetchProjects();
    } catch (err) {
      setError("Failed to delete project.");
    }
  };

  // ✅ Edit handler — pass raw project data
  const handleEdit = (row) => {
    setEditProject(row.raw);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditProject(null);
  };

  // ✅ Refresh + toast after add/edit
  const handleRefresh = () => {
    fetchProjects();
    showToast(
      editProject
        ? "Project updated successfully!"
        : "Project added successfully!"
    );
  };

  // ✅ DataGrid columns
  const columns = [
    {
      field: "title",
      headerName: "Project",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight={600} color="text.primary">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      minWidth: 180,
      renderCell: (params) => (
        <Typography variant="body2" color="text.secondary">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "techStack",
      headerName: "Tech Stack",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            bgcolor: "rgba(167,139,250,0.1)",
            color: "#A78BFA",
            border: "1px solid rgba(167,139,250,0.2)",
            fontWeight: 500,
            borderRadius: 2,
          }}
        />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => <StatusChip status={params.value} />,
    },
    {
      field: "teamMembers",
      headerName: "Team",
      flex: 1,
      minWidth: 160,
      renderCell: (params) => (
        <Typography variant="body2" color="text.secondary">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 110,
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" gap={0.5}>
          <Tooltip title="Edit">
            <IconButton
              size="small"
              onClick={() => handleEdit(params.row)}
              sx={{
                color: "#4F8EF7",
                bgcolor: "rgba(79,142,247,0.1)",
                borderRadius: 1.5,
                "&:hover": { bgcolor: "rgba(79,142,247,0.2)" },
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              onClick={() => handleDelete(params.row.id)}
              sx={{
                color: "#F87171",
                bgcolor: "rgba(248,113,113,0.1)",
                borderRadius: 1.5,
                "&:hover": { bgcolor: "rgba(248,113,113,0.2)" },
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box display="flex" sx={{ minHeight: "100vh", bgcolor: "#0F1117" }}>
      <Navbar />

      <Box sx={{ marginLeft: "250px", flexGrow: 1, p: 4 }}>

        {/* ✅ Header */}
        <Box display="flex" justifyContent="space-between" alignItems="flex-end" mb={4}>
          <Box>
            <Typography variant="overline" color="text.secondary" letterSpacing={2}>
              Management
            </Typography>
            <Typography variant="h4" fontWeight={700} color="text.primary">
              Projects
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
            sx={{ borderRadius: 2, px: 3 }}
          >
            Add Project
          </Button>
        </Box>

        {/* ✅ Error alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {/* ✅ Loading / Table */}
        {loading ? (
          <Box display="flex" justifyContent="center" mt={8}>
            <CircularProgress sx={{ color: "#4F8EF7" }} />
          </Box>
        ) : projects.length === 0 ? (
          <Box textAlign="center" mt={8}>
            <Typography color="text.secondary" variant="h6">
              No projects found.
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Click "Add Project" to get started.
            </Typography>
          </Box>
        ) : (
          <Box
            ref={tableRef}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            <DataGrid
              rows={projects}
              columns={columns}
              initialState={{
                pagination: { paginationModel: { pageSize: 7 } },
              }}
              pageSizeOptions={[7, 15]}
              disableRowSelectionOnClick
              autoHeight
              sx={{
                border: "none",
                bgcolor: "#1A1D2E",
                "& .MuiDataGrid-columnHeaders": {
                  bgcolor: "#12152A",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  "& .MuiDataGrid-columnHeaderTitle": {
                    color: "#94A3B8",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    letterSpacing: 1,
                    textTransform: "uppercase",
                  },
                },
                "& .MuiDataGrid-row": {
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  "&:hover": {
                    bgcolor: "rgba(79,142,247,0.05)",
                  },
                },
                "& .MuiDataGrid-cell": {
                  borderColor: "transparent",
                  display: "flex",
                  alignItems: "center",
                },
                "& .MuiDataGrid-footerContainer": {
                  bgcolor: "#12152A",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                },
                "& .MuiTablePagination-root": {
                  color: "#94A3B8",
                },
                "& .MuiDataGrid-selectedRowCount": {
                  color: "#94A3B8",
                },
              }}
            />
          </Box>
        )}

        {/* ✅ GSAP Toast Notification */}
        <Snackbar
          open={toast.open}
          autoHideDuration={3000}
          onClose={hideToast}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Box
            ref={toastRef}
            sx={{
              display: "flex", alignItems: "center", gap: 1.5,
              px: 3, py: 1.5, borderRadius: 3,
              background: "linear-gradient(135deg, #1A1D2E, #12152A)",
              border: "1px solid rgba(79,142,247,0.3)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            <CheckCircleIcon sx={{ color: "#4F8EF7", fontSize: 20 }} />
            <Typography variant="body2" color="text.primary" fontWeight={500}>
              {toast.message}
            </Typography>
          </Box>
        </Snackbar>

        {/* ✅ Dialog — handles both add and edit */}
        <AddProjectDialog
          open={open}
          handleClose={handleClose}
          refreshProjects={handleRefresh}
          editProject={editProject}
        />

      </Box>
    </Box>
  );
};

export default Projects;