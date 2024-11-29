import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/tasks/${id}`)
      .then((response) => response.json())
      .then((data) => setTask(data))
      .catch((error) => console.error("Error fetching task:", error));
  }, [id]);

  const handleUpdate = async () => {
    try {
      await fetch(`/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`/tasks/${id}`, { method: "DELETE" });
      navigate("/");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  if (!task) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
      <form className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Title</label>
          <input
            type="text"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Description</label>
          <textarea
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            rows="4"
            className="w-full px-3 py-2 border rounded focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Status</label>
          <select
            value={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <button
          type="button"
          onClick={handleUpdate}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Update Task
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition mt-2"
        >
          Delete Task
        </button>
      </form>
    </div>
  );
};

export default TaskDetails;
