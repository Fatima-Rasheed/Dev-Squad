import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import TaskForm from "../components/TaskForm";
import { TaskList } from "../components/TaskList.jsx";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      const tasksArray = Array.isArray(res.data) ? res.data : res.data.tasks || [];
      setTasks(tasksArray);
      console.log("Tasks fetched:", tasksArray);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleUpdate = async (id, updatedData) => {
    try {
      await api.put(`/tasks/${id}`, updatedData);
      setTasks(prev => prev.map(t => (t._id === id ? { ...t, ...updatedData } : t)));
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // Add a task to state directly
  const handleTaskAdded = (newTask) => {
    setTasks(prev => [...(Array.isArray(prev) ? prev : []), newTask]);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-end mb-4">
          <button 
            onClick={handleLogout}
            className="px-6 py-2 bg-black text-white font-bold rounded-xl shadow-md hover:bg-gray-900 transition"
          >
            Logout
          </button>
        </div>

        <header className="text-center mb-12">
          <h1 className="text-6xl font-black text-slate-800 tracking-tight">
            Task <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Master</span>
            <span className="ml-4 inline-flex items-center justify-center bg-white shadow-lg text-blue-600 text-2xl h-12 w-12 rounded-2xl font-bold">
              {tasks.length}
            </span>
          </h1>
        </header>

        <div className="space-y-10">
          <section>
            {/* TaskForm now calls handleTaskAdded instead of fetchTasks */}
            <TaskForm onTaskAdded={handleTaskAdded} />
          </section>

          <section>
            <TaskList tasks={tasks} onDelete={deleteTask} onUpdate={handleUpdate} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;