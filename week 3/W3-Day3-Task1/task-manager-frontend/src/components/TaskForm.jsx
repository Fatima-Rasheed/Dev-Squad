import { useState } from "react";
import api from "../services/api";

const TaskForm = ({ onTaskAdded }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    completed: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskData.title.trim()) {
      setError("Task title is required");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await api.post("/tasks", taskData);
      const newTask = response.data.data; // extract task object

      setTaskData({ title: "", description: "", completed: false });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);

      if (onTaskAdded) onTaskAdded(newTask);
    } catch (err) {
      console.error("Failed to add task:", err);
      setError(err.response?.data?.message || "Failed to add task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 space-y-4"
    >
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded">
          ✓ Task added successfully!
        </div>
      )}

      <input
        placeholder="Task Title"
        className="w-full p-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        value={taskData.title}
        onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
        disabled={loading}
      />
      <textarea
        placeholder="Description"
        className="w-full p-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        value={taskData.description}
        onChange={(e) =>
          setTaskData({ ...taskData, description: e.target.value })
        }
        disabled={loading}
      />
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={taskData.completed}
          onChange={(e) =>
            setTaskData({ ...taskData, completed: e.target.checked })
          }
          disabled={loading}
        />
        <span>Mark as completed</span>
      </label>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition disabled:bg-gray-600 disabled:cursor-not-allowed"
      >
        {loading ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;