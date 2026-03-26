import { useState } from "react";

export const TaskList = ({ tasks, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "", completed: false });

  const startEdit = (task) => {
    setEditingId(task.uuid);
    setEditForm({ title: task.title, description: task.description, completed: task.completed });
  };

  const handleSave = async (uuid) => {
    await onUpdate(uuid, editForm);
    setEditingId(null);
  };

  if (!Array.isArray(tasks) || tasks.length === 0) {
    return <p className="text-center text-slate-500">No tasks available</p>;
  }

  return (
    <div className="space-y-4">
      {tasks.map((task, index) => (
        <div
          key={task.uuid || index}
          className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm"
        >
          {editingId === task.uuid ? (
            <div className="space-y-2">
              <input
                className="w-full p-2 border-2 border-slate-300 rounded"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              />
              <textarea
                className="w-full p-2 border-2 border-slate-300 rounded"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editForm.completed}
                  onChange={(e) => setEditForm({ ...editForm, completed: e.target.checked })}
                />
                Completed
              </label>
              <button
                onClick={() => handleSave(task.uuid)}
                className="bg-black text-white px-3 py-1 rounded hover:bg-gray-900 transition"
              >
                Save
              </button>
            </div>
          ) : (
            <div>
              <h3 className={`text-xl font-bold ${task.completed ? "line-through text-slate-400" : ""}`}>
                {task.title || "Untitled Task"}
              </h3>
              <p className="text-slate-600">{task.description || "No description"}</p>

              <div className="mt-2 flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onUpdate(task.uuid, { completed: !task.completed })}
                  />
                  <span>{task.completed ? "Completed" : "Mark Complete"}</span>
                </label>

                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(task)}
                    className="text-blue-500 font-bold hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(task.uuid)}
                    className="text-blue-500 font-bold hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};